import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {Router, Scene, Stack} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import LoginPage from './auth/LoginPage';
import SignupPage from './auth/SignupPage';
import HomePage from './home/HomePage';
import MapPage from './home/MapPage';
import NotificationsPage from './home/NotificationsPage';
import {alertActions} from '../redux/actions/alert.actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scene: {
    backgroundColor: '#F5FCFF',
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
  tabBar: {
    height: 50,
    borderTopColor: 'darkgrey',
    borderTopWidth: 1,
    opacity: 0.98,
    justifyContent: 'space-between',
  },
  activeLabel: {
    color: '#c4e3cb',
    textDecorationLine: 'underline',
  },
  label: {
    fontSize: 20,
    color: '#f4f9f4',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const activeIconColor = '#c4e3cb';
    const iconColor = '#f4f9f4';
    return (
      <Router
        sceneStyle={styles.scene}
        selector={props => (!props.loggedIn ? 'login' : props.section)}>
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
                      style={{width: 30}}
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
                      style={{width: 30}}
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
                      style={{width: 30}}
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
          <Scene
            key="register"
            title="Register"
            hideTabBar={true}
            hideNavBar={true}
            path="/signup"
            component={SignupPage}
          />
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
