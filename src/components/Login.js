import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleLoginUser } from '../actions/authenticator';
import {
  AVATAR_OF,
  LOGIN_INTRO,
  WOULD_YOU_RATHER,
  CardViewMode,
  getRandomImageUrlByTimeStamp
} from '../utils/helpers';
import QuestionCard from './QuestionCard';

class Login extends Component {
  handleCardClick = id => {
    const { dispatch } = this.props;

    dispatch(handleLoginUser(id));
  };

  render() {
    const { isAuthed, loading, location, users } = this.props;

    if (loading === true || !users) {
      return <div />;
    }

    const { from } = location.state || { from: { pathname: '/' } };

    if (isAuthed) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <h1 className='title'>
          {WOULD_YOU_RATHER}
          ...
        </h1>
        <p className='center'>{LOGIN_INTRO}</p>
        <div className='masonry bordered'>
          {users.map((user, index) => (
            <QuestionCard
              avatar={user.avatarURL}
              avatarAltText={`${AVATAR_OF} ${user.name}`}
              cardViewMode={CardViewMode.LOGIN}
              imageAltText={user.name}
              imageUrl={getRandomImageUrlByTimeStamp()}
              key={user.id}
              name={user.name}
              onCardClick={() => this.handleCardClick(user.id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authenticator, users }) {
  const isAuthed = authenticator.authenticated;
  return {
    isAuthed,
    loading: users === null,
    users: Object.keys(users).map(id => {
      const { name, avatarURL } = users[id];

      return {
        id,
        name,
        avatarURL
      };
    })
  };
}

export default connect(mapStateToProps)(Login);
