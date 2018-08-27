import { ipcRenderer } from 'electron';
import { observable, action, runInAction, computed } from 'mobx';
import PouchDB from 'pouchdb';
import {
  RENDERER_MESSAGE,
  REQUEST_AUTH_TOKEN,
} from '../../share/IPC_COMMANDS';
import { APP_KEY } from '../../share/CONFIG';
import { createMsg } from '../utils';

class Oauth {
  @observable inProgress = false;
  @observable errors = undefined;
  @observable accessToken = undefined;
  @observable uid = undefined;
  docId = 'auth';
  rev = undefined;
  constructor() {
    this.db = new PouchDB('auth');
    this.db.get(this.docId).then(result => {
      runInAction('restore_access_token_from_db', () => {
        this.accessToken = result.access_token;
        this.uid = result.uid;
      });
      this.rev = result._rev;
    });
    ipcRenderer.on(REQUEST_AUTH_TOKEN, this.setToken);
  }
  @action
  login() {
    this.inProgress = true;
    ipcRenderer.send(RENDERER_MESSAGE, createMsg(REQUEST_AUTH_TOKEN));
  }
  @action.bound
  setToken(e, response) {
    this.inProgress = false;
    if (response.success) {
      const { access_token, uid } = response.data;
      this.accessToken = access_token;
      this.uid = uid;
      this.db.put({
        access_token,
        uid,
        _id: this.docId,
        _rev: this.rev,
      });
    } else {
      this.errors = response.errorMsg;
    }
  }

  @computed get headers() {
    return new Headers({
      Authorization: `OAuth2 ${this.accessToken}`,
      appkey: APP_KEY,
    });
  }
}

const oauth = new Oauth();

export default observable(oauth);
