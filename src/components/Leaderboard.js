import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionCard from './QuestionCard';
import {
  AVATAR_OF,
  LEADERBOARD,
  CardViewMode,
  getRandomImageUrlByTimeStamp
} from '../utils/helpers';

class Leaderboard extends Component {
  render() {
    const { users } = this.props;

    return (
      <div>
        <h1 className='title'>{LEADERBOARD}</h1>

        <div className='masonry bordered'>
          {users.map((user, index) => (
            <QuestionCard
              avatar={user.avatarURL}
              avatarAltText={`${AVATAR_OF} ${user.name}`}
              cardViewMode={CardViewMode.LEADERBOARD}
              imageAltText={user.name}
              imageUrl={getRandomImageUrlByTimeStamp()}
              key={user.id}
              leaderBoardPosition={index + 1}
              name={user.name}
              totalQuestions={user.totalQuestions}
              totalAnswers={user.totalAnswers}
            />
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.keys(users)
      .map(id => {
        const { name, avatarURL, questions } = users[id];

        return {
          id,
          name,
          avatarURL,
          totalQuestions: questions.length,
          totalAnswers: users[id].answers.length
        };
      })
      .sort(
        (a, b) =>
          b.totalQuestions + b.totalAnswers > a.totalQuestions + a.totalAnswers
      )
  };
}

export default connect(mapStateToProps)(Leaderboard);
