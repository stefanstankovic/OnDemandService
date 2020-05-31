import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Animated,
  Platform,
  FlatList,
} from 'react-native';

import {connect} from 'react-redux';
import {Header} from 'react-native-elements';

import styles from '../common/styles';
import * as constants from '../common/constants';
const data = [
  {
    image:
      'https://cdn.th3rdwave.coffee/articles/rkvHXu_Il/rkvHXu_Il-1100-700.jpg',
    title: 'Le Brûloir',
  },
  {
    image:
      'https://cdn.th3rdwave.coffee/articles/rkTnGunIx/rkTnGunIx-1100-700.jpg',
    title: 'Le Petit Brûloir',
  },
  {
    image:
      'https://cdn.th3rdwave.coffee/articles/HknxZ9awg/HknxZ9awg-1100-700.jpg',
    title: 'Oui Mais Non',
  },
  {
    image:
      'https://cdn.th3rdwave.coffee/merchants/rJWPQ2mKx/rJWPQ2mKx-1100-700.jpg',
    title: 'PERKO',
  },
  {
    image:
      'https://cdn.th3rdwave.coffee/merchants/rJWPQ2mKx/rJWPQ2mKx-1100-700.jpg',
    title: 'Perko',
  },
  {
    image:
      'https://cdn.th3rdwave.coffee/articles/B1XmNBmLe/B1XmNBmLe-1100-700.jpg',
    title: 'Café Saint-Henri | Marché Jean-Talon',
  },
  {
    image:
      'https://cdn.th3rdwave.coffee/articles/rkvHXu_Il/rkvHXu_Il-1100-700.jpg',
    title: 'Le Brûloir',
  },
  {
    image:
      'https://cdn.th3rdwave.coffee/articles/rkTnGunIx/rkTnGunIx-1100-700.jpg',
    title: 'Le Petit Brûloir',
  },
  {
    image:
      'https://cdn.th3rdwave.coffee/articles/HknxZ9awg/HknxZ9awg-1100-700.jpg',
    title: 'Oui Mais Non',
  },
  {
    image:
      'https://cdn.th3rdwave.coffee/merchants/rJWPQ2mKx/rJWPQ2mKx-1100-700.jpg',
    title: 'PERKO',
  },
  {
    image:
      'https://cdn.th3rdwave.coffee/merchants/rJWPQ2mKx/rJWPQ2mKx-1100-700.jpg',
    title: 'Perko',
  },
  {
    image:
      'https://cdn.th3rdwave.coffee/articles/B1XmNBmLe/B1XmNBmLe-1100-700.jpg',
    title: 'Café Saint-Henri | Marché Jean-Talon',
  },
];

const AnimatedListView = Animated.createAnimatedComponent(FlatList);
const AnimatedHeader = Animated.createAnimatedComponent(Header);

class HomePage extends Component {
  constructor(props) {
    super(props);

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.state = {
      dataSource: data,
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

  _renderRow = (rowData, sectionId, rowId) => {
    let loadedItem = rowData.leadingItem;
    return (
      <Image
        style={styles.row}
        key={rowId}
        source={{uri: loadedItem.image}}
        resizeMode="cover"
      />
    );
  };

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
          data={this.state.dataSource}
          ItemSeparatorComponent={this._renderRow}
          style={styles.contentContainer}
          renderRow={this._renderRow}
          scrollEventThrottle={1}
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollEndDrag={this._onScrollEndDrag}
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
            leftComponent={{icon: 'menu', color: '#fff'}}
            centerComponent={{text: 'MY TITLE', style: {color: '#fff'}}}
            rightComponent={{icon: 'home', color: '#fff'}}
          />
        </Animated.View>
      </View>
    );
  }
}

export default connect()(HomePage);
