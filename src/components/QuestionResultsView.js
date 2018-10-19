import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionCard from './QuestionCard';
import {
  AUTHOR_RESULTS_QUOTE,
  AVATAR_OF,
  OPTION_ONE,
  OPTION_TWO,
  RANDOM_IMAGE,
  RESULTS,
  CardViewMode,
  formatQuestionAnswer,
  getRandomImageUrlByTimeStamp
} from '../utils/helpers';

class QuestionResultsView extends Component {
  render() {
    const { question } = this.props;
    const {
      avatar,
      hasVotedOptionOne,
      hasVotedOptionTwo,
      name,
      optionOneText,
      optionOneVotes,
      optionOneVotesDescription,
      optionOneVotesPercentage,
      optionOneVotesPercentageDescription,
      optionTwoText,
      optionTwoVotes,
      optionTwoVotesDescription,
      optionTwoVotesPercentage,
      optionTwoVotesPercentageDescription
    } = question;

    return (
      <div>
        <QuestionCard
          authorQuote={AUTHOR_RESULTS_QUOTE}
          avatar={avatar}
          avatarAltText={`${AVATAR_OF} ${name}`}
          cardViewMode={CardViewMode.AVATAR}
          imageAltText={RANDOM_IMAGE}
          imageUrl={getRandomImageUrlByTimeStamp()}
          name={name}
        />

        <QuestionCard
          cardViewMode={CardViewMode.RESULT}
          imageAltText={RESULTS}
          imageUrl={getRandomImageUrlByTimeStamp()}
          isSelected={hasVotedOptionOne}
          option={OPTION_ONE}
          optionOneText={optionOneText}
          optionOneVotes={optionOneVotes}
          optionOneVotesDescription={optionOneVotesDescription}
          optionOneVotesPercentage={optionOneVotesPercentage}
          optionOneVotesPercentageDescription={
            optionOneVotesPercentageDescription
          }
        />

        <QuestionCard
          cardViewMode={CardViewMode.RESULT}
          imageAltText={RESULTS}
          imageUrl={getRandomImageUrlByTimeStamp()}
          isSelected={hasVotedOptionTwo}
          option={OPTION_TWO}
          optionTwoText={optionTwoText}
          optionTwoVotes={optionTwoVotes}
          optionTwoVotesDescription={optionTwoVotesDescription}
          optionTwoVotesPercentage={optionTwoVotesPercentage}
          optionTwoVotesPercentageDescription={
            optionTwoVotesPercentageDescription
          }
        />
      </div>
    );
  }
}

function mapStateToProps({ authenticator, questions, users }, { id }) {
  const authedUser = authenticator.authedUser.id;
  const question = questions[id];

  if (!question) {
    return {
      question: null
    };
  }

  return {
    authedUser,
    question: question
      ? formatQuestionAnswer(question, users[question.author], authedUser)
      : null
  };
}

export default connect(mapStateToProps)(QuestionResultsView);
