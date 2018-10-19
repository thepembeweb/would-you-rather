export const ADD_A_QUESTION = 'Add a Question';
export const ANSWERS = 'ANSWERS';
export const AUTHOR_QUESTION_QUOTE = 'asks, Would you rather...';
export const AUTHOR_RESULTS_QUOTE = 'asked, Would you rather...';
export const AVATAR_OF = 'Avatar of';
export const CHOOSE_YOUR_ANSWER = 'Choose your Answer';
export const DEFAULT_IMAGE_SIZE = '480/700';
export const GO_TO_HOME_PAGE = 'Go to Home Page';
export const IMAGES_HOST_URL = 'https://unsplash.it';
export const LEADERBOARD = 'LEADERBOARD';
export const LOGIN = 'LOGIN';
export const LOGIN_INTRO = 'Please select a user to log in as.';
export const OPTION_ONE = 'optionOne';
export const OPTION_ONE_TEXT = 'optionOneText';
export const OPTION_TWO = 'optionTwo';
export const OPTION_TWO_TEXT = 'optionTwoText';
export const PAGE_NOT_FOUND = 'Page not found';
export const PAGE_NOT_FOUND_HEADING = 'Oops, Sorry.';
export const QUESTIONS = 'Questions';
export const RANDOM_IMAGE = 'Random Image';
export const RESULTS = 'Results';
export const TEXT = 'Text';
export const VOTE = 'Vote';
export const VOTES = 'Votes';
export const WOULD_YOU_RATHER = 'Would you rather';
export const YOU_SELECTED_THIS_ONE = 'You selected this one';

export const CardViewMode = {
  AVATAR: 'AVATAR',
  DASHBOARD: 'DASHBOARD',
  EDIT: 'EDIT',
  LEADERBOARD: 'LEADERBOARD',
  LOGIN: 'LOGIN',
  PAGE_NOT_FOUND: 'PAGE_NOT_FOUND',
  PLACEHOLDER: 'PLACEHOLDER',
  RESULT: 'RESULT'
};

function getFormattedRandomImageUrl(imageSize, randomNumber) {
  return `${IMAGES_HOST_URL}/${imageSize}?sig=${randomNumber}`;
}

export function getRandomImageUrl(index) {
  const imageSizes = [
    '600/650',
    '600/600',
    '720/660',
    '480/700',
    '600/600',
    '940/840',
    '500/780'
  ];

  const randomIndex = Math.floor(Math.random() * imageSizes.length);
  const imageSize = imageSizes[randomIndex];

  return getFormattedRandomImageUrl(imageSize, index);
}

export function getRandomImageUrlByTimeStamp() {
  const timeStamp = Math.floor(Date.now() / 1000);
  const randomNumber = Math.floor(Math.random() * 100 + 1);

  return getFormattedRandomImageUrl(
    DEFAULT_IMAGE_SIZE,
    `${timeStamp}${randomNumber}`
  );
}

export function formatQuestion(question, author, authedUser) {
  const {
    id,
    optionOneText,
    optionTwoText,
    optionOneVotes,
    optionTwoVotes,
    timestamp,
    author: questionAuthor
  } = question;
  const { name, avatarURL } = author;

  return {
    name,
    id,
    timestamp,
    avatar: avatarURL,
    optionOneText,
    optionTwoText,
    optionOneVotes,
    optionTwoVotes,
    isQuestionAuthor: questionAuthor === authedUser,
    hasAnswered: [...optionOneVotes, ...optionTwoVotes].includes(authedUser)
  };
}

export function formatQuestionAnswer(question, author, authedUser) {
  const {
    id,
    optionOneText,
    optionTwoText,
    optionOneVotes,
    optionTwoVotes,
    timestamp
  } = question;
  const { name, avatarURL } = author;

  return {
    name,
    id,
    timestamp,
    avatar: avatarURL,
    optionOneText,
    optionTwoText,
    optionOneVotes: optionOneVotes.length,
    optionTwoVotes: optionTwoVotes.length,
    optionOneVotesDescription: getVotesDescription(optionOneVotes.length),
    optionTwoVotesDescription: getVotesDescription(optionTwoVotes.length),
    totalVotes: [...optionOneVotes, ...optionTwoVotes].length,
    optionOneVotesPercentage: getPercentage(
      optionOneVotes.length,
      [...optionOneVotes, ...optionTwoVotes].length
    ),
    optionTwoVotesPercentage: getPercentage(
      optionTwoVotes.length,
      [...optionOneVotes, ...optionTwoVotes].length
    ),
    optionOneVotesPercentageDescription: getPercentageDescription(
      optionOneVotes.length,
      [...optionOneVotes, ...optionTwoVotes].length
    ),
    optionTwoVotesPercentageDescription: getPercentageDescription(
      optionTwoVotes.length,
      [...optionOneVotes, ...optionTwoVotes].length
    ),
    hasVotedOptionOne: optionOneVotes.includes(authedUser),
    hasVotedOptionTwo: optionTwoVotes.includes(authedUser)
  };
}

export function flattenQuestion(question) {
  return Object.keys(question).reduce((flattenedQuestion, key) => {
    const val = question[key];

    if (isObject(val)) {
      flattenedQuestion[`${key}${TEXT}`] = val.text;
      flattenedQuestion[`${key}${VOTES}`] = val.votes;
      return flattenedQuestion;
    }

    flattenedQuestion[key] = val;
    return flattenedQuestion;
  }, {});
}

export function formatQuestions(questions) {
  const questionIds = Object.keys(questions);

  return questionIds.reduce((formattedQuestions, id) => {
    formattedQuestions[id] = flattenQuestion(questions[id]);
    return formattedQuestions;
  }, {});
}

export function formatUser(user) {
  const formattedUser = {
    ...user,
    answers: Object.keys(user.answers)
  };

  return formattedUser;
}

export function formatUsers(users) {
  return Object.keys(users).reduce((formattedUsers, id) => {
    const user = users[id];

    formattedUsers[id] = {
      ...user,
      answers: Object.keys(user.answers)
    };

    return formattedUsers;
  }, {});
}

function getPercentage(number, total) {
  return Math.floor((number / total) * 100);
}

function formatPercentage(percentage) {
  return `${Math.round(percentage)}%`;
}

function getPercentageDescription(number, total) {
  return formatPercentage(getPercentage(number, total));
}

function getVotesDescription(votes) {
  if (votes === 1) {
    return `${votes} ${VOTE}`;
  } else {
    return `${votes} ${VOTES}`;
  }
}

function isObject(item) {
  return Object.prototype.toString.call(item) === '[object Object]';
}
