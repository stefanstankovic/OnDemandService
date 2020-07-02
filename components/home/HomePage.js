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

import {Actions} from 'react-native-router-flux';

import {Header, ListItem} from 'react-native-elements';

import styles from '../common/styles';
import * as constants from '../common/constants';

import SocketService from '../../services/socket.service';
import {WS_BASE} from '../../config';

const AnimatedListView = Animated.createAnimatedComponent(FlatList);
const AnimatedHeader = Animated.createAnimatedComponent(Header);

class HomePage extends Component {
  constructor(props) {
    super(props);

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.props.actions.allWorkers(this.props.authToken);

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
  }

  _clampedScrollValue = 0;
  _offsetValue = 0;
  _scrollValue = 0;

  componentDidMount() {
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

    if (this.props.loggedIn) {
      SocketService.getInstance().connectSocket(WS_BASE, this.props.authToken);
    }
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();

    if (this.props.loggedIn) {
      SocketService.getInstance().disconnetFromSocket();
    }
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
    //let loadedItem = rowData.leadingItem;
    return (
      <TouchableOpacity onPress={() => Actions.viewProfile({worker: item})}>
        <ListItem
          title={`${item.name}`}
          subtitle={item.email}
          avatar={{
            uri:
              'https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png',
          }}
        />
      </TouchableOpacity>
    );
  };

  _keyExtractor = (item, index) => index.toString();

  render() {
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
                setTimeout(() => this.setState({refreshing: false}), 1000);
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
            centerComponent={{text: 'WORKERS', style: {color: '#fff'}}}
            rightComponent={{
              icon: 'settings',
              color: '#fff',
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
    loggedIn: state.user.loggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      allWorkers: bindActionCreators(workersActions.allWorkers, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
