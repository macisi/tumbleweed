import { combineReducers } from 'redux';

import { default as AuthReducer } from './modules/authorization/store';

const reducer = combineReducers({
  auth: AuthReducer,
});

export default reducer;
