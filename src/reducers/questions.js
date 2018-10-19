import { RECEIVE_QUESTIONS, ADD_QUESTION } from '../actions/questions';
import { ADD_QUESTION_ANSWER } from '../actions/answers';
import { VOTES } from '../utils/helpers';

export default function questions(state = {}, action) {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      };
    case ADD_QUESTION_ANSWER:
      const { answer, id, authedUser } = action;
      const question = state[id];
      const votesKey = `${answer}${VOTES}`;

      return {
        ...state,
        [action.id]: {
          ...question,
          [votesKey]: question[votesKey].concat([authedUser])
        }
      };
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    default:
      return state;
  }
}
