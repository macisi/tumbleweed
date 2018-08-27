/**
 * Timeline Store
 * @author ryan bian
 * @date 2018-08-27
 * @class Timeline
 */
import { action, computed, observable, runInAction } from 'mobx';

import { HOME_TIMELINE, USER_TIMELINE } from '../../share/API';
import oauth from './oauth';

class Timeline {
  @observable posts = [];
  @observable state = 'done'; // done pending error
  constructor(uid) {
    this.count = 20;
    this.uid = uid;
  }
  @computed get since_id() {
    return this.posts.length > 0 ? this.posts[0].id : 0;
  }
  @computed get max_id() {
    return this.posts.length > 0 ? this.posts[this.posts.length - 1].id : 0;
  }
  @action.bound
  async getPosts(page) {
    const params = new URLSearchParams({
      since_id: this.since_id,
      max_id: this.max_id,
      count: this.count,
    });
    if (typeof page !== 'undefined') {
      params.append('page', page);
    }
    try {
      this.state = 'pending';
      const response = await fetch(`${HOME_TIMELINE}?${params}`, {
        headers: oauth.headers,
      });
      const result = await response.json();
      runInAction('GET_POSTS', () => {
        this.state = 'done';
        this.posts = this.posts.concat(result.statuses);
      });
    } catch (err) {
      // TODO: handle err
      this.state = 'error';
    }
  }
}

export const myTimeline = new Timeline();

export default Timeline;
