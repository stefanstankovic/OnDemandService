import React from 'react';
import {Router, Scene, Drawer} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Icon} from 'react-native-elements';

import LoginPage from './auth/LoginPage';
import HomePage from './home/HomePage';
import MapPage from './home/MapPage';
import SettingsPage from './home/SettingsPage';
import NotificationsPage from './home/NotificationsPage';
import ProfileViewPage from './home/profile/ProfileViewPage';

import ExitDialog from './common/ExitDialog';

import {alertActions} from '../redux/actions/alert.actions';

import styles from './common/styles';
import * as constants from './common/constants';

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
              key="home"
              title="Home"
              tabs={true}
              tabBarStyle={styles.tabBar}
              hideNavBar
              path="/home"
              initial={this.props.loggedIn}>
              <Scene
                key="homeScreen"
                tabBarLabel="Home"
                gesturesEnabled={false}
                hideNavBar
                component={HomePage}
                icon={({focused}) => {
                  return (
                    <Icon
                      style={styles.icon}
                      type="antdesign"
                      name={'home'}
                      size={30}
                      color={
                        focused
                          ? constants.ACTIVE_TAB_ICON_COLOR
                          : constants.TAB_ICON_COLOR
                      }
                    />
                  );
                }}
              />
              <Scene
                hideNavBar
                key="mapScreen"
                tabBarLabel="Map"
                component={MapPage}
                icon={({focused}) => {
                  return (
                    <Icon
                      style={styles.icon}
                      type="entypo"
                      name={'map'}
                      size={30}
                      color={
                        focused
                          ? constants.ACTIVE_TAB_ICON_COLOR
                          : constants.TAB_ICON_COLOR
                      }
                    />
                  );
                }}
              />
              <Scene
                hideNavBar
                key="notificationsScreen"
                tabBarLabel="Notifications"
                component={NotificationsPage}
                icon={({focused}) => {
                  return (
                    <Icon
                      style={styles.icon}
                      type="antdesign"
                      name={'notification'}
                      size={30}
                      color={
                        focused
                          ? constants.ACTIVE_TAB_ICON_COLOR
                          : constants.TAB_ICON_COLOR
                      }
                    />
                  );
                }}
              />
            </Scene>
            <Scene
              key="viewProfile"
              title="viewProfile"
              hideTabBar={true}
              hideNavBar={true}
              path="/home/viewProfile"
              initial={false}
              component={ProfileViewPage}
            />
            <Scene
              key="settings"
              title="Settings"
              hideTabBar={true}
              hideNavBar={true}
              path="/home/settings/:id"
              initial={false}
              component={SettingsPage}
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
