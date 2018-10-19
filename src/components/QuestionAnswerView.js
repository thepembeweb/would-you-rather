import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionCard from './QuestionCard';
import {
  AUTHOR_QUESTION_QUOTE,
  AVATAR_OF,
  CHOOSE_YOUR_ANSWER,
  OPTION_ONE,
  OPTION_TWO,
  RANDOM_IMAGE,
  CardViewMode,
  formatQuestion,
  getRandomImageUrlByTimeStamp
} from '../utils/helpers';

class QuestionAnswerView extends Component {
  render() {
    const { handleAnswer, question } = this.props;
    const { avatar, name, optionOneText, optionTwoText } = question;

    return (
      <div>
        <QuestionCard
          authorQuote={AUTHOR_QUESTION_QUOTE}
          avatar={avatar}
          avatarAltText={`${AVATAR_OF} ${name}`}
          cardViewMode={CardViewMode.AVATAR}
          imageAltText={RANDOM_IMAGE}
          imageUrl={getRandomImageUrlByTimeStamp()}
          name={name}
        />
        <QuestionCard
          avatar={avatar}
          cardViewMode={CardViewMode.EDIT}
          imageAltText={CHOOSE_YOUR_ANSWER}
          imageUrl={getRandomImageUrlByTimeStamp()}
          name={name}
          onOptionOneClick={() => handleAnswer(OPTION_ONE)}
          onOptionTwoClick={() => handleAnswer(OPTION_TWO)}
          optionOneText={optionOneText}
          optionTwoText={optionTwoText}
        />
      </div>
    );
  }
}

function mapStateToProps(
  { authenticator, questions, users },
  { id, handleAnswer }
) {
  const authedUser = authenticator.authedUser.id;
  const question = questions[id];

  if (!question) {
    return {
      question: null
    };
  }

  return {
    authedUser,
    handleAnswer,
    id,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  };
}

export default connect(mapStateToProps)(QuestionAnswerView);
