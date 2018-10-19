import { saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';

function addQuestionAnswer({ authedUser, id, answer }) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    id,
    answer
  };
}

export function handleAddQuestionAnswer(questionAnswer) {
  return dispatch => {
    dispatch(showLoading());
    return saveQuestionAnswer(questionAnswer)
      .then(() => dispatch(addQuestionAnswer(questionAnswer)))
      .then(() => dispatch(hideLoading()));
  };
}
