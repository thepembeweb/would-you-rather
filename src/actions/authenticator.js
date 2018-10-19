import { getUser } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function receiveAuthLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    authenticated: true,
    authedUser: user
  };
}

export function receiveAuthLogout() {
  return {
    type: LOGOUT_SUCCESS,
    authenticated: null,
    authedUser: null
  };
}

export function handleLoginUser(id) {
  return dispatch => {
    dispatch(showLoading());
    getUser(id).then(user => {
      dispatch(receiveAuthLogin(user));
      dispatch(hideLoading());
    });
  };
}

export function handleLogoutUser() {
  return dispatch => {
    dispatch(showLoading());
    dispatch(receiveAuthLogout());
    dispatch(hideLoading());
  };
}
