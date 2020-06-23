import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Home from './home';
import LoginPage from './auth/LoginPage';
import ExitDialog from './common/ExitDialog';

import {alertActions} from '../redux/actions/alert.actions';
import styles from './common/styles';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Router sceneStyle={styles.scene}>
          <Scene key="root">
            <Scene
              key="login"
              title="Login"
              hideTabBar={true}
              hideNavBar={true}
              path="/login"
              component={LoginPage}
              initial={!this.props.loggedIn}
            />
            <Scene
              hideTabBar={true}
              hideNavBar={true}
              initial={this.props.loggedIn}
              component={Home}
            />
          </Scene>
        </Router>
        <ExitDialog />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      clear: bindActionCreators(alertActions.clear, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
