import React, {Component, useContext} from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {Icon} from 'react-native-elements';

import HomePage from './HomePage';
import MapPage from './MapPage';
import NotificationsPage from './NotificationsPage';

import styles from '../common/styles';

import SocketService from '../../services/socket.service';
import {WS_BASE} from '../../config';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      SocketService.getInstance().connectSocket(WS_BASE, this.props.authToken);
    }
  }

  render() {
    const activeIconColor = '#c4e3cb';
    const iconColor = '#f4f9f4';
    return (
      <Router>
        <Stack hideNavBar>
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
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    authToken: state.authentication.token,
    loggedIn: state.authentication.loggedIn,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Home);
