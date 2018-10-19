import {
  _getUser,
  _getUsers,
  _saveQuestion,
  _getQuestions,
  _saveQuestionAnswer
} from './_DATA.js';

import {
  flattenQuestion,
  formatQuestions,
  formatUser,
  formatUsers
} from './helpers.js';

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users: formatUsers(users),
      questions: formatQuestions(questions)
    })
  );
}

export function getUserInitialData(id) {
  return getUser(id).then(u => formatUser(u));
}

export function getUser(id) {
  return _getUser(id);
}

export function getUsers() {
  return _getUsers();
}

export function saveQuestion(data) {
  return _saveQuestion(data).then(p => flattenQuestion(p));
}

export function saveQuestionAnswer(data) {
  return _saveQuestionAnswer(data);
}

export function getQuestions() {
  return _getQuestions();
}
