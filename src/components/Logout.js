import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { receiveAuthLogout } from '../actions/authenticator';

class Logout extends Component {
  componentDidMount() {
    this.props.dispatch(receiveAuthLogout());
  }

  render() {
    return <Redirect to='/login' />;
  }
}

export default connect()(Logout);
