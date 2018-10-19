import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionCard from './QuestionCard';
import { handleAddQuestion } from '../actions/questions';
import {
  ADD_A_QUESTION,
  OPTION_ONE_TEXT,
  OPTION_TWO_TEXT,
  RANDOM_IMAGE,
  WOULD_YOU_RATHER,
  CardViewMode,
  getRandomImageUrlByTimeStamp
} from '../utils/helpers';

class AddQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: ''
  };
  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };
  submitQuestion = () => {
    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, history } = this.props;

    dispatch(handleAddQuestion(optionOneText, optionTwoText));

    history.push('/');
  };
  render() {
    const { optionOneText, optionTwoText } = this.state;
    const imageUrl = getRandomImageUrlByTimeStamp();

    return (
      <div>
        <h1 className='title'>{ADD_A_QUESTION}</h1>

        <div className='masonry bordered'>
          <QuestionCard
            cardViewMode={CardViewMode.PLACEHOLDER}
            imageAltText={RANDOM_IMAGE}
            imageUrl={getRandomImageUrlByTimeStamp()}
          />

          <div className='item'>
            <img alt='Choose your Answer' src={imageUrl} />
            <div className='box'>
              <h3>{WOULD_YOU_RATHER}</h3>
              <hr />
              <input
                className='input'
                type='text'
                name={OPTION_ONE_TEXT}
                value={optionOneText}
                onChange={this.handleInputChange}
              />
              <h3>OR</h3>
              <input
                className='input'
                type='text'
                name={OPTION_TWO_TEXT}
                value={optionTwoText}
                onChange={this.handleInputChange}
              />
              <hr />
              <button className='answer-text' onClick={this.submitQuestion}>
                <span>Submit</span>
              </button>
            </div>
          </div>

          <QuestionCard
            cardViewMode={CardViewMode.PLACEHOLDER}
            imageAltText={RANDOM_IMAGE}
            imageUrl={getRandomImageUrlByTimeStamp()}
          />
        </div>
      </div>
    );
  }
}

export default connect()(AddQuestion);
