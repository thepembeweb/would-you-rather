import { combineReducers } from 'redux';
import authenticator from './authenticator';
import questions from './questions';
import users from './users';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
  authenticator,
  questions,
  users,
  loadingBar: loadingBarReducer
});
