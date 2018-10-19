import { saveQuestion } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    dispatch(showLoading());

    const { authenticator } = getState();
    const authedUser = authenticator.authedUser.id;

    saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    }).then(question => {
      dispatch(addQuestion(question));
      dispatch(hideLoading());
    });
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}
