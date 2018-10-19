import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionCard from './QuestionCard';
import {
  AVATAR_OF,
  CHOOSE_YOUR_ANSWER,
  CardViewMode,
  formatQuestion,
  getRandomImageUrlByTimeStamp
} from '../utils/helpers';

class Dashboard extends Component {
  state = {
    showAnswered: false
  };
  showAnswered = () => {
    this.setState({
      showAnswered: true
    });
  };
  showUnanswered = () => {
    this.setState({
      showAnswered: false
    });
  };
  handleCardClick = id => {
    this.props.history.push(`/questions/${id}`);
  };
  render() {
    const { showAnswered } = this.state;
    const { answeredQuestions, unansweredQuestions } = this.props;

    const questions =
      showAnswered === true ? answeredQuestions : unansweredQuestions;

    return (
      <div>
        <h1 className='title'>Your Dashboard</h1>

        <div className='intro'>
          <span>
            <button
              className='filter'
              style={{
                textDecoration: showAnswered === false ? 'underline' : null,
                color: showAnswered === false ? 'red' : null
              }}
              onClick={this.showUnanswered}
            >
              Unanswered Questions
            </button>
          </span>
          <span>
            <button
              className='filter'
              style={{
                textDecoration: showAnswered === true ? 'underline' : null,
                color: showAnswered === true ? 'red' : null
              }}
              onClick={this.showAnswered}
            >
              Answered Questions
            </button>
          </span>
        </div>

        <div className='masonry bordered'>
          {questions.map((question, index) => (
            <QuestionCard
              avatar={question.avatar}
              avatarAltText={`${AVATAR_OF} ${question.name}`}
              cardViewMode={CardViewMode.DASHBOARD}
              imageAltText={CHOOSE_YOUR_ANSWER}
              imageUrl={getRandomImageUrlByTimeStamp()}
              key={question.id}
              name={question.name}
              onCardClick={() => this.handleCardClick(question.id)}
              optionOneText={question.optionOneText}
              optionTwoText={question.optionTwoText}
            />
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authenticator, questions, users }) {
  const authedUser = authenticator.authedUser.id;
  const answers = users[authedUser].answers;

  const answeredQuestions = answers
    .map(id => questions[id])
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(question =>
      formatQuestion(question, users[question.author], authedUser)
    );

  const unansweredQuestions = Object.keys(questions)
    .filter(id => !answers.includes(id))
    .map(id => questions[id])
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(question =>
      formatQuestion(question, users[question.author], authedUser)
    );

  return {
    answeredQuestions,
    unansweredQuestions
  };
}

export default connect(mapStateToProps)(Dashboard);
