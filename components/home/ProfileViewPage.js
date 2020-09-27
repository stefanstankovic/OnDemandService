import React, {Component} from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  Text,
  View,
  RefreshControl,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import * as constants from '../common/constants';

import styles from '../common/profile.styles';
import defaultStyles from '../common/styles';
import formStyles from '../common/form.styles';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {rankActions} from '../../redux/actions/rank.actions';

import {Actions} from 'react-native-router-flux';

class ProfileViewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -constants.PROFILE.HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
    };

    this.props.actions.ranksForWorker(
      this.props.worker.id,
      this.props.authToken,
    );
  }

  _renderScrollViewContent() {
    if (!this.props.isLoading && this.props.ranks.length === 0) {
      return (
        <View style={styles.scrollViewContent}>
          <View style={formStyles.container}>
            <Text>This customer hasn't had ranks yet!</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.scrollViewContent}>
        {this.props.ranks.map((value, i) => {
          const star1icon =
            value.stars >= 1
              ? require('../images/full-star.png')
              : require('../images/empty-star.png');
          const star2icon =
            value.stars >= 2
              ? require('../images/full-star.png')
              : require('../images/empty-star.png');
          const star3icon =
            value.stars >= 3
              ? require('../images/full-star.png')
              : require('../images/empty-star.png');
          const star4icon =
            value.stars >= 4
              ? require('../images/full-star.png')
              : require('../images/empty-star.png');
          const star5icon =
            value.stars === 5
              ? require('../images/full-star.png')
              : require('../images/empty-star.png');
          return (
            <View key={i} style={formStyles.container}>
              <View style={formStyles.starContainer}>
                <Image style={formStyles.star} source={star1icon} />
                <Image style={formStyles.star} source={star2icon} />
                <Image style={formStyles.star} source={star3icon} />
                <Image style={formStyles.star} source={star4icon} />
                <Image style={formStyles.star} source={star5icon} />
              </View>
              <Text style={formStyles.additionalInfo}>{value.comment}</Text>
            </View>
          );
        })}
      </View>
    );
  }

  render() {
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? constants.PROFILE.HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, constants.PROFILE.HEADER_SCROLL_DISTANCE],
      outputRange: [0, -constants.PROFILE.HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const titleScale = scrollY.interpolate({
      inputRange: [
        0,
        constants.PROFILE.HEADER_SCROLL_DISTANCE / 2,
        constants.PROFILE.HEADER_SCROLL_DISTANCE,
      ],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [
        0,
        constants.PROFILE.HEADER_SCROLL_DISTANCE / 2,
        constants.PROFILE.HEADER_SCROLL_DISTANCE,
      ],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.fill}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
            {useNativeDriver: true},
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({refreshing: true});
                this.props.actions.ranksForWorker(
                  this.props.worker.id,
                  this.props.authToken,
                );
                setTimeout(() => this.setState({refreshing: false}), 1000);
              }}
              // Android offset for RefreshControl
              progressViewOffset={constants.PROFILE.HEADER_MAX_HEIGHT}
            />
          }
          // iOS offset for RefreshControl
          contentInset={{
            top: constants.PROFILE.HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -constants.PROFILE.HEADER_MAX_HEIGHT,
          }}>
          {this.props.isLoading && (
            <View style={defaultStyles.loading}>
              <ActivityIndicator size="large" />
            </View>
          )}
          {this._renderScrollViewContent()}
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[styles.header, {transform: [{translateY: headerTranslate}]}]}>
          <Image
            style={styles.profileAvatar}
            source={require('../images/logo.png')}
          />
          <View style={styles.profileBody}>
            <View style={styles.profileBodyContent}>
              <Text style={styles.title}>{this.props.worker.name}</Text>
              <Text style={styles.profileInfo}>{this.props.worker.email}</Text>
              <Text style={styles.profileInfo}>{this.props.worker.mobile}</Text>
            </View>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [{scale: titleScale}, {translateY: titleTranslate}],
            },
          ]}>
          <TouchableOpacity
            style={styles.profileButtonContainer}
            onPress={() => {
              Actions.hireRequest({worker: this.props.worker});
            }}>
            <Text style={styles.profileName}>Hire worker</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.rank.isLoading,
    authToken: state.user.token,
    ranks: state.rank.ranks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ranksForWorker: bindActionCreators(rankActions.ranksForWorker, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileViewPage);
