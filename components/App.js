import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Icon} from 'react-native-elements';

import HomePage from './home/HomePage';
import MapPage from './home/MapPage';
import NotificationsPage from './home/NotificationsPage';
import LoginPage from './auth/LoginPage';
import {alertActions} from '../redux/actions/alert.actions';
import styles from './common/styles';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const activeIconColor = '#c4e3cb';
    const iconColor = '#f4f9f4';
    return (
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
          <Stack hideNavBar initial={this.props.loggedIn}>
            <Scene
              hideNavBar
              key="home-screen"
              tabs={true}
              tabBarStyle={styles.tabBar}
              default="Main">
              <Scene
                key="home"
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
                      color={focused ? activeIconColor : iconColor}
                    />
                  );
                }}
              />
              <Scene
                hideNavBar
                key="map"
                tabBarLabel="Map"
                component={MapPage}
                icon={({focused}) => {
                  return (
                    <Icon
                      style={styles.icon}
                      type="entypo"
                      name={'map'}
                      size={30}
                      color={focused ? activeIconColor : iconColor}
                    />
                  );
                }}
              />
              <Scene
                hideNavBar
                key="notifications"
                tabBarLabel="Notifications"
                component={NotificationsPage}
                icon={({focused}) => {
                  return (
                    <Icon
                      style={styles.icon}
                      type="antdesign"
                      name={'notification'}
                      size={30}
                      color={focused ? activeIconColor : iconColor}
                    />
                  );
                }}
              />
            </Scene>
          </Stack>
        </Scene>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.authentication.loggedIn,
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
