import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav(authedUser) {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink to='/new' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <span className='userProfile'>
            <img
              src={authedUser.authedUser.avatarURL}
              alt={`Avatar of ${authedUser.authedUser.name}`}
              className='avatar'
            />
            {authedUser.authedUser.name}
          </span>
          <NavLink to='/logout' activeClassName='active'>
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
