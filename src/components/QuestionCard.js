import React from 'react';
import {
  ANSWERS,
  GO_TO_HOME_PAGE,
  LOGIN,
  OPTION_ONE,
  PAGE_NOT_FOUND,
  QUESTIONS,
  WOULD_YOU_RATHER,
  YOU_SELECTED_THIS_ONE,
  CardViewMode
} from '../utils/helpers';

export default function QuestionCard({
  authorQuote,
  avatar,
  avatarAltText,
  cardViewMode,
  imageAltText,
  imageUrl,
  isSelected,
  leaderBoardPosition,
  name,
  onCardClick,
  onOptionOneClick,
  onOptionTwoClick,
  option,
  optionOneText,
  optionOneVotesDescription,
  optionOneVotesPercentage,
  optionOneVotesPercentageDescription,
  optionTwoText,
  optionTwoVotesDescription,
  optionTwoVotesPercentage,
  optionTwoVotesPercentageDescription,
  totalQuestions,
  totalAnswers
}) {
  if (cardViewMode === CardViewMode.DASHBOARD) {
    return (
      <div className='item cursor-pointer' onClick={onCardClick}>
        <img alt={imageAltText} src={imageUrl} />
        <div className='box'>
          {`${WOULD_YOU_RATHER} ${optionOneText} or ${optionTwoText}?`}
          <span className='authorInfo'>
            <img src={avatar} alt={avatarAltText} className='avatar' />
            <small>{name}</small>
          </span>
        </div>
      </div>
    );
  }
  if (cardViewMode === CardViewMode.EDIT) {
    return (
      <div className='item'>
        <img alt={imageAltText} src={imageUrl} />
        <div className='box'>
          <button className='answer-text' onClick={onOptionOneClick}>
            <span>{optionOneText}</span>
          </button>
          <button className='answer-text' onClick={onOptionTwoClick}>
            <span>{optionTwoText}</span>
          </button>
        </div>
      </div>
    );
  }
  if (cardViewMode === CardViewMode.RESULT) {
    return (
      <div className='item'>
        <img alt={imageAltText} src={imageUrl} />
        <div className='box'>
          <ul className='poll-results-list'>
            {option === OPTION_ONE ? (
              <CardResultItem
                optionText={optionOneText}
                optionVotesPercentage={optionOneVotesPercentage}
                optionVotesPercentageDescription={
                  optionOneVotesPercentageDescription
                }
                optionVotesDescription={optionOneVotesDescription}
                isSelected={isSelected}
              />
            ) : (
              <CardResultItem
                optionText={optionTwoText}
                optionVotesPercentage={optionTwoVotesPercentage}
                optionVotesPercentageDescription={
                  optionTwoVotesPercentageDescription
                }
                optionVotesDescription={optionTwoVotesDescription}
                isSelected={isSelected}
              />
            )}
          </ul>
        </div>
      </div>
    );
  }
  if (cardViewMode === CardViewMode.AVATAR) {
    return (
      <div className='item'>
        <img alt={imageAltText} src={imageUrl} />
        <div className='box'>
          <span className='authorInfo'>
            <img src={avatar} alt={avatarAltText} className='avatar' />
            <small>{`${name} ${authorQuote}`}</small>
          </span>
        </div>
      </div>
    );
  }
  if (cardViewMode === CardViewMode.PLACEHOLDER) {
    return (
      <div className='item'>
        <img alt={imageAltText} src={imageUrl} />
        <div className='box' />
      </div>
    );
  }
  if (cardViewMode === CardViewMode.LEADERBOARD) {
    return (
      <div className='item'>
        <img alt={imageAltText} src={imageUrl} />
        <div className='box'>
          <span className='authorInfo'>
            <img src={avatar} alt={avatarAltText} className='avatar' />
            <small>
              #{leaderBoardPosition} {name}
            </small>
          </span>
          <hr />
          <span className='leaderboard-info'>
            {totalQuestions} {QUESTIONS}
          </span>
          <hr />
          <span className='leaderboard-info'>
            {totalAnswers} {ANSWERS}
          </span>
          <hr />
          <span className='results-total'>{totalQuestions + totalAnswers}</span>
        </div>
      </div>
    );
  }
  if (cardViewMode === CardViewMode.LOGIN) {
    return (
      <div className='item'>
        <img alt={imageAltText} src={imageUrl} />
        <div className='box'>
          <span className='authorInfo'>
            <img src={avatar} alt={avatarAltText} className='avatar' />
            <small>{name}</small>
          </span>
          <button className='answer-text' onClick={onCardClick}>
            <span>{LOGIN}</span>
          </button>
        </div>
      </div>
    );
  }
  if (cardViewMode === CardViewMode.PAGE_NOT_FOUND) {
    return (
      <div className='item'>
        <img alt={imageAltText} src={imageUrl} />
        <div className='box'>
          <h3>{PAGE_NOT_FOUND}</h3>
          <button className='answer-text' onClick={onOptionTwoClick}>
            <span>{GO_TO_HOME_PAGE}</span>
          </button>
        </div>
      </div>
    );
  }
}

function CardResultItem({
  isSelected,
  optionText,
  optionVotesDescription,
  optionVotesPercentage,
  optionVotesPercentageDescription
}) {
  return (
    <li>
      <div>
        <span>{optionText}</span>
        <hr />
        <span>
          <small
          >{`(${optionVotesPercentageDescription}, ${optionVotesDescription})`}</small>
        </span>
        <hr />
      </div>
      <div className='out-bar'>
        <div
          className='inner-bar'
          style={{ width: `${optionVotesPercentage}%` }}
        />
      </div>

      <hr />

      {isSelected === true && (
        <div>
          <span>
            <small>
              ({YOU_SELECTED_THIS_ONE}) <br /> &#9786;
            </small>
          </span>
        </div>
      )}
    </li>
  );
}
