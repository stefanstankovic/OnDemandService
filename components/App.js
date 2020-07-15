import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Icon} from 'react-native-elements';

import LoginPage from './auth/LoginPage';

import HomePage from './home/HomePage';
import MapPage from './home/MapPage';
import SettingsPage from './home/SettingsPage';
import ProfileViewPage from './home/ProfileViewPage';
import HireRequestPage from './home/HireRequestPage';
import {InitialScreen} from './InitialScreen';

import NotificationsPage from './notifications/NotificationsPage';
import NotificationDetailsPage from './notifications/NotificationDetailsPage';

import ExitDialog from './common/ExitDialog';

import {alertActions} from '../redux/actions/alert.actions';

import styles from './common/styles';
import colors from './common/colors';

import AsyncStorage from '@react-native-community/async-storage';
import * as constants from './common/constants';
import {isNull} from 'lodash';
import {userActions} from '../redux/actions/user.actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarting: true,
    };
  }

  async componentDidMount() {
    const user = await AsyncStorage.getItem(constants.ASYNC_STORE_KEYS.USER);
    const authToken = await AsyncStorage.getItem(
      constants.ASYNC_STORE_KEYS.AUTH_TOKEN,
    );

    if (!isNull(user) && !isNull(authToken)) {
      const userData = JSON.parse(user);
      this.props.actions.setUser(userData, authToken);
    }

    this.appIsStarted();
  }

  appIsStarted() {
    this.setState({isStarting: false});
  }

  render() {
    return (
      <>
        <Router sceneStyle={styles.scene}>
          <Scene key="root">
            <Scene
              key="init"
              title="Init"
              hideNavBar
              path="/init"
              component={InitialScreen}
              initial={this.state.isStarting}
            />
            <Scene
              key="login"
              title="Login"
              hideTabBar={true}
              hideNavBar={true}
              path="/login"
              component={LoginPage}
              initial={!this.state.isStarting && !this.props.loggedIn}
            />
            <Scene
              key="home"
              title="Home"
              tabs={true}
              tabBarStyle={styles.tabBar}
              hideNavBar
              path="/home"
              initial={!this.state.isStarting && this.props.loggedIn}>
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
                      color={focused ? colors.activeTab : colors.tabIcon}
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
                      color={focused ? colors.activeTab : colors.tabIcon}
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
                      color={focused ? colors.activeTab : colors.tabIcon}
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
            <Scene
              key="hireRequest"
              title="Hire Request"
              hideTabBar={true}
              hideNavBar={true}
              path="/home/hire/:id"
              initial={false}
              component={HireRequestPage}
            />
            <Scene
              key="notificationDetails"
              title="Notification Details"
              path="/notification/:id"
              initial={false}
              component={NotificationDetailsPage}
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
      setUser: bindActionCreators(userActions.setUser, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
