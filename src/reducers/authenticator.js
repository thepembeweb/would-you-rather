import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/authenticator';

export default function auth(state = {}, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: action.authenticated,
        authedUser: action.authedUser
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        authenticated: action.authenticated,
        authedUser: action.authedUser
      };
    default:
      return state;
  }
}
