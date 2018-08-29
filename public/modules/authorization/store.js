/**
 * Authorization Store
 * @author ryan bian
 *
 */
import { Map } from 'immutable';
import { createActions, handleActions } from 'redux-actions';

// import { combineReducers } from 'redux-immutable';
import { remote } from 'electron';

const defaultState = Map({
  login: false,
  pending: false,
  access_token: undefined,
  uid: undefined,
});

const grantService = remote.require('./service/grant');

export const actions = createActions({
  REQUEST_LOGIN() {
    grantService.requestAccessToken();
    return true;
  },
  LOGIN_IN(data) {
    return data;
  },
});

const reducer  = handleActions({
  REQUEST_LOGIN(state) {
    return state.set('pending', true);
  },
  LOGIN_IN(state, { payload }) {
    return state
      .set('pending', false)
      .set('access_token', payload.access_token)
      .set('uid', payload.uid);
  },
}, defaultState);

export default reducer;
