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
} from 'react-native';

import * as constants from '../common/constants';
import styles from '../common/profile.styles';

import {connect} from 'react-redux';
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
  }

  _renderScrollViewContent() {
    const data = Array.from({length: 30});
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) => (
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        ))}
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

export default connect()(ProfileViewPage);
