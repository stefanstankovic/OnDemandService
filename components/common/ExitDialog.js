import React, {Component} from 'react';
import {BackHandler, Animated, TouchableOpacity, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../redux/actions/user.actions';

import styles from './styles';
import * as constants from './constants';

class ExitDialog extends Component {
  state = {
    backClickCount: 0,
  };

  constructor(props) {
    super(props);

    this.springValue = new Animated.Value(100);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
    );
  }

  _spring() {
    this.setState({backClickCount: 1}, () => {
      Animated.sequence([
        Animated.spring(this.springValue, {
          toValue: -0.15 * constants.SCREEN_HEIGHT,
          friction: 5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(this.springValue, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        this.setState({backClickCount: 0});
      });
    });
  }

  handleBackButton = () => {
    const scene = Actions.currentScene;
    // alert(scene)
    if (scene !== 'login' || scene !== 'home' || scene !== 'homeScreen') {
      if (this.state.backClickCount === 1) {
        this.props.loggedIn && this.props.actions.logout();
        BackHandler.exitApp();
      } else {
        this._spring();
      }

      return true;
    }

    Actions.pop();
    return true;
  };

  render() {
    return (
      <>
        <Animated.View
          style={[
            styles.exitAnimatedView,
            {transform: [{translateY: this.springValue}]},
          ]}>
          <Text style={styles.exitTitleText}>
            Press back again to exit the app
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => BackHandler.exitApp()}>
            <Text style={styles.exitText}>Exit</Text>
          </TouchableOpacity>
        </Animated.View>
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
      logout: bindActionCreators(userActions.logout, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExitDialog);
