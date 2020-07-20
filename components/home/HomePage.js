import React, {Component} from 'react';
import {
  View,
  Animated,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {workersActions} from '../../redux/actions/workers.actions';
import {notificationActions} from '../../redux/actions/notifications.actions';

import {Actions} from 'react-native-router-flux';

import {Header, ListItem, Avatar} from 'react-native-elements';

import styles from '../common/styles';
import * as constants from '../common/constants';

import SocketService from '../../services/socket.service';
import {WS_BASE} from '../../config';
import colors from '../common/colors';

import PushNotification from 'react-native-push-notification';
import {notificationService} from '../../services/notifications.service';

import AsyncStorage from '@react-native-community/async-storage';
import {locationService} from '../../services/location.service';

const AnimatedListView = Animated.createAnimatedComponent(FlatList);
const AnimatedHeader = Animated.createAnimatedComponent(Header);

class HomePage extends Component {
  constructor(props) {
    super(props);

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.props.actions.allWorkers(this.props.authToken);
    this.subscribe();

    this.state = {
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim,
        ),
        0,
        constants.NAVBAR_HEIGHT - constants.STATUS_BAR_HEIGHT,
      ),
    };
    var _authToken = this.props.authToken;
    PushNotification.configure({
      onRegister: async function(token) {
        notificationService
          .registerDevice(token.token, _authToken)
          .then(() => {
            AsyncStorage.setItem(
              constants.ASYNC_STORE_KEYS.DEVICE_TOKEN,
              token.token,
            ).catch(ex => console.log(ex));
          })
          .catch(ex => console.log(ex));
      },
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
        //notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  subscribe() {
    SocketService.getInstance().connectSocket(WS_BASE, this.props.authToken);
    this.props.actions.subscribeOnNotifications();
  }

  _clampedScrollValue = 0;
  _offsetValue = 0;
  _scrollValue = 0;

  async componentDidMount() {
    this.state.scrollAnim.addListener(({value}) => {
      const diff = value - this._scrollValue;
      this._scrollValue = value;
      this._clampedScrollValue = Math.min(
        Math.max(this._clampedScrollValue + diff, 0),
        constants.NAVBAR_HEIGHT - constants.STATUS_BAR_HEIGHT,
      );
    });
    this.state.offsetAnim.addListener(({value}) => {
      this._offsetValue = value;
    });

    await AsyncStorage.setItem(
      constants.ASYNC_STORE_KEYS.USER,
      JSON.stringify(this.props.user),
    );
    await AsyncStorage.setItem(
      constants.ASYNC_STORE_KEYS.AUTH_TOKEN,
      this.props.authToken,
    );

    await locationService.startWatchLocation();
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

  _onScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
  };

  _onMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  };

  _onMomentumScrollEnd = () => {
    const toValue =
      this._scrollValue > constants.NAVBAR_HEIGHT &&
      this._clampedScrollValue >
        (constants.NAVBAR_HEIGHT - constants.STATUS_BAR_HEIGHT) / 2
        ? this._offsetValue + constants.NAVBAR_HEIGHT
        : this._offsetValue - constants.NAVBAR_HEIGHT;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  _renderRow = ({item}) => {
    return (
      <TouchableOpacity onPress={() => Actions.viewProfile({worker: item})}>
        <ListItem
          badge={{
            textStyle: {color: 'green'},
          }}
          title={`${item.name}`}
          subtitle={item.email}
          leftAvatar={
            <Avatar
              rounded
              source={require('../images/logo.png')}
              title={'Sample Title'}
            />
          }
          bottomDivider
          chevron
        />
      </TouchableOpacity>
    );
  };

  _keyExtractor = (item, index) => index.toString();

  render() {
    if (this.props.newNotification) {
      PushNotification.localNotification({
        title: this.props.newNotification.title,
        message: this.props.newNotification.subtitle,
      });
      this.props.actions.cleanNewNotifications();
    }

    const {clampedScroll} = this.state;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, constants.NAVBAR_HEIGHT - constants.STATUS_BAR_HEIGHT],
      outputRange: [
        0,
        -(constants.NAVBAR_HEIGHT - constants.STATUS_BAR_HEIGHT),
      ],
      extrapolate: 'clamp',
    });
    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, constants.NAVBAR_HEIGHT - constants.STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.fill}>
        <AnimatedListView
          data={this.props.workers}
          style={styles.contentContainer}
          renderItem={this._renderRow}
          scrollEventThrottle={1}
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollEndDrag={this._onScrollEndDrag}
          keyExtractor={this._keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({refreshing: true});
                this.props.actions.allWorkers(this.props.authToken);
                this.setState({refreshing: false});
              }}
              // Android offset for RefreshControl
              progressViewOffset={constants.NAVBAR_HEIGHT}
            />
          }
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollAnim}}}],
            {useNativeDriver: true},
          )}
        />
        <Animated.View
          style={[styles.navbar, {transform: [{translateY: navbarTranslate}]}]}>
          <AnimatedHeader
            containerStyle={styles.headerContainer}
            style={[styles.title, {opacity: navbarOpacity}]}
            centerComponent={{text: 'WORKERS', style: {color: colors.white}}}
            rightComponent={{
              icon: 'settings',
              color: colors.white,
              onPress: () => Actions.settings(),
            }}
          />
        </Animated.View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    loadingWorkers: state.workers.loadingWorkers,
    workers: state.workers.workers,
    authToken: state.user.token,
    user: state.user.user,
    loggedIn: state.user.loggedIn,
    newNotification: state.notification.newNotification,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      allWorkers: bindActionCreators(workersActions.allWorkers, dispatch),
      subscribeOnNotifications: bindActionCreators(
        notificationActions.subscribeOnNotifications,
        dispatch,
      ),
      confirmNotificationDelivered: bindActionCreators(
        notificationActions.confirmNotificationDelivered,
        dispatch,
      ),
      cleanNewNotifications: bindActionCreators(
        notificationActions.cleanNewNotifications,
        dispatch,
      ),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
