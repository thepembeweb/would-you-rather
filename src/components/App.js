import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import AddQuestion from './AddQuestion';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import LoadingBar from 'react-redux-loading';
import Login from './Login';
import Logout from './Logout';
import Nav from './Nav';
import PageNotFound from './PageNotFound';
import ProtectedRoute from './ProtectedRoute';
import Question from './Question';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <div className='wrapper'>
              {this.props.authenticated == null ? null : (
                <Nav authedUser={this.props.authedUser} />
              )}
              <div>
                {this.props.loading === true ? null : (
                  <div>
                    <Switch>
                      <ProtectedRoute
                        path='/'
                        exact
                        component={Dashboard}
                        isAuthenticated={this.props.authenticated}
                      />
                      <ProtectedRoute
                        path='/leaderboard'
                        exact
                        component={connect(mapStateToProps)(Leaderboard)}
                        isAuthenticated={this.props.authenticated}
                      />
                      <ProtectedRoute
                        path='/questions/:id'
                        exact
                        component={connect(mapStateToProps)(Question)}
                        isAuthenticated={this.props.authenticated}
                      />
                      <ProtectedRoute
                        path='/new'
                        exact
                        component={AddQuestion}
                        isAuthenticated={this.props.authenticated}
                      />
                      <Route
                        path='/login'
                        exact
                        component={withRouter(Login)}
                      />
                      <Route
                        path='/logout'
                        exact
                        component={withRouter(Logout)}
                      />
                      <Route component={PageNotFound} />
                    </Switch>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authenticator }) {
  return {
    authedUser: authenticator.authedUser,
    authenticated: authenticator.authenticated,
    loading: false
  };
}

export default connect(mapStateToProps)(App);
