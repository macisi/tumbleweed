import { action, when, runInAction, observable } from 'mobx';
import {
  USERS_SHOW,
} from '../../share/API';

import oauth from './oauth';

class User {
  @observable userInfo = {};
  constructor(oauth) {
    this.oauth = oauth;
    when(
      () => !!this.oauth.accessToken,
      this.getUserInfo,
    );
  }
  @action.bound
  async getUserInfo() {
    const params = new URLSearchParams({
      uid: this.oauth.uid,
    }).toString();
    try {
      const response = await fetch(`${USERS_SHOW}?${params}`, {
        headers: this.oauth.headers,
      });
      const userInfo = await response.json();
      if (!userInfo.error) {
        runInAction('assign_user_info', () => {
          this.userInfo = userInfo;
        });
      }
    } catch (e) {
      // TODO: handle error
    }
  }
}

export const currentUser = new User(oauth);

export default User;
