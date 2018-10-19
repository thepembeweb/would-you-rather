import { ADD_QUESTION } from '../actions/questions';
import { ADD_QUESTION_ANSWER } from '../actions/answers';
import { RECEIVE_USERS } from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case ADD_QUESTION:
      const question = action.question;
      const { author, id } = question;

      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([id])
        }
      };
    case ADD_QUESTION_ANSWER:
      const user = state[action.authedUser];

      return {
        ...state,
        [action.authedUser]: {
          ...user,
          answers: user.answers.concat([action.id])
        }
      };
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    default:
      return state;
  }
}
