import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestionAnswer } from '../actions/answers';
import PageNotFound from './PageNotFound';
import QuestionAnswerView from './QuestionAnswerView';
import QuestionResultsView from './QuestionResultsView';
import {
  AUTHOR_QUESTION_QUOTE,
  AUTHOR_RESULTS_QUOTE,
  formatQuestion
} from '../utils/helpers';

class Question extends Component {
  state = {
    showResults: false
  };
  showResults = () => {
    this.setState({
      showResults: true
    });
  };
  showQuestion = () => {
    this.setState({
      showResults: false
    });
  };

  handleAnswer = answer => {
    const { dispatch, id, authedUser } = this.props;
    this.answered = true;

    dispatch(
      handleAddQuestionAnswer({
        authedUser,
        id,
        answer
      })
    );

    this.showResults();
  };

  render() {
    if (this.props.question === null) {
      return <PageNotFound />;
    }

    const { showResults } = this.state;
    const { id, question } = this.props;
    const { hasAnswered, name } = question;
    const showResultsView = showResults === true || hasAnswered;

    return (
      <div>
        {showResultsView === true ? (
          <div>
            <h1>{`${name} ${AUTHOR_RESULTS_QUOTE}`}</h1>
            <div className='masonry bordered page'>
              <QuestionResultsView id={id} />
            </div>
          </div>
        ) : (
          <div>
            <h1>{`${name} ${AUTHOR_QUESTION_QUOTE}`}</h1>
            <div className='masonry bordered page'>
              <QuestionAnswerView id={id} handleAnswer={this.handleAnswer} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ authenticator, questions, users }, props) {
  const authedUser = authenticator.authedUser.id;
  const { id } = props.match.params;
  const question = questions[id];

  if (!question) {
    return {
      question: null
    };
  }

  return {
    authedUser,
    id,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  };
}

export default connect(mapStateToProps)(Question);
