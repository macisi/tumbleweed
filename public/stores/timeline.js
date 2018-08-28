/**
 * Timeline Store
 * @author ryan bian
 * @date 2018-08-27
 * @class Timeline
 */
import { action, observable, runInAction } from 'mobx';

import { HOME_TIMELINE, USER_TIMELINE } from '../../share/API';
import oauth from './oauth';

class Timeline {
  @observable.shallow posts = [];
  @observable totalCount = 0;
  @observable state = 'done'; // done pending error
  @observable max_id = undefined;
  @observable since_id = undefined;
  constructor(uid) {
    this.count = 20;
    this.uid = uid;
  }
  @action.bound
  async getPosts(latest = false, count = 20) {
    const params = new URLSearchParams({
      count,
    });
    if (latest) {
      params.append('since_id', this.since_id || 0);
    } else {
      params.append('max_id', this.max_id || 0);
    }
    try {
      this.state = 'pending';
      const response = await fetch(`${HOME_TIMELINE}?${params}`, {
        headers: oauth.headers,
      });
      const result = await response.json();
      if (!result.error) {
        runInAction('GET_POSTS', () => {
          this.state = 'done';
          if (latest) {
            this.posts = result.statuses.concat(this.posts);
          } else {
            this.posts = this.posts.concat(result.statuses);
          }
          this.totalCount = result.total_number;
          this.since_id = result.since_id;
          this.max_id = result.max_id;
        });
      } else {
        // TODO: error handle
        runInAction(() => {
          this.state = 'done';
        });
      }
    } catch (err) {
      // TODO: handle err
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}

export const myTimeline = new Timeline();

export default Timeline;
