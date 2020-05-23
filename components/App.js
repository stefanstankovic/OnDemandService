import React from 'react';
import {StyleSheet, View, Image, Text, Icon} from 'react-native';
import {Router, Scene, Tabs, Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import LoginPage from './auth/LoginPage';
import SignupPage from './auth/SignupPage';
import HomePage from './home/HomePage';
import MapPage from './home/MapPage';
import NotificationsPage from './home/NotificationsPage';
import {alertActions} from '../redux/actions/alert.actions';

const homeImg = require('./images/home.png');
const mapImg = require('./images/map.png');
const notificationsImg = require('./images/notifications.png');

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
          <Scene
            key="home-screen"
            hideNavBar
            lazy={true}
            tabStyle={styles.tab}
            swipeEnabled={false}
            initial={this.props.loggedIn}>
            <Tabs
              hideNavBar
              showLabel={true}
              lazy={true}
              tabStyle={styles.tab}
              tabBarStyle={styles.tabBar}
              labelStyle={styles.label}
              swipeEnabled={false}>
              <Scene
                hideNavBar
                key="home"
                component={HomePage}
                icon={props => {
                  let textColor = props.focused ? '#333333' : '#999999';
                  const settingImageFocused = require('./images/home.png');
                  const settingImageUnfocused = require('./images/home.png');
                  let settingImage = props.focused
                    ? settingImageFocused
                    : settingImageUnfocused;
                  let borderColor = props.focused ? '#333333' : '#FFFFFF';
                  return (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopColor: borderColor,
                        borderTopWidth: 4,
                        padding: 20,
                      }}>
                      <Image
                        source={settingImage}
                        style={{width: 20, height: 20}}
                      />
                      <Text style={{color: textColor}}>Settings</Text>
                    </View>
                  );
                }}
              />
              <Scene hideNavBar key="map" component={MapPage} />
              <Scene
                hideNavBar
                key="notifications"
                component={NotificationsPage}
              />
            </Tabs>
          </Scene>
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
