import {TouchableOpacity, Dimensions, Text, View} from 'react-native';
import React, {Component} from 'react';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';

import {connect} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import styles from '../common/styles';
import * as constants from '../common/constants';

import PushNotification from 'react-native-push-notification';

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {polyline: []};

    this.getPermissions();
  }

  getPermissions() {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    }).then(data => {
      if (data === 'already-enabled') {
        this.findMe();
      } else {
        setTimeout(() => {
          this.findMe();
        }, 1000);
      }
    });
  }

  findMe() {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        const {latitude, longitude} = coords;
        this.setState({
          position: {
            latitude,
            longitude,
          },
          region: {
            latitude,
            longitude,
            latitudeDelta: constants.LATITUDE_DELTA,
            longitudeDelta: constants.LONGITUDE_DELTA,
          },
        });
      },
      error => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  componentDidMount() {
    this.watchID = Geolocation.watchPosition(
      ({coords}) => {
        const {latitude, longitude} = coords;
        let polyline = [...this.state.polyline];
        polyline.push({
          latitude: latitude,
          longitude: longitude,
        });
        this.setState({
          position: {
            latitude,
            longitude,
          },
          markers: [
            {
              latitude: latitude,
              longitude: longitude,
            },
          ],
          polyline,
        });

        this.getPermissions();
      },
      error => alert(JSON.stringify(error)),
      {
        distanceFilter: 100,
        enableHighAccuracy: true,
      },
    );
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  render() {
    const {height: windowHeight} = Dimensions.get('window');
    const varTop = windowHeight - 150;
    const hitSlop = {
      top: 15,
      bottom: 15,
      left: 15,
      right: 15,
    };
    const bbStyle = function(vheight) {
      return {
        position: 'absolute',
        top: vheight,
        left: 15,
        right: 15,
        backgroundColor: 'transparent',
        alignItems: 'flex-end',
      };
    };

    let polyline;

    if (this.state.polyline.length > 5) {
      polyline = (
        <Polyline key="polyiline1" coordinates={this.state.polyline} />
      );
    }

    return (
      <View style={styles.mapContainer}>
        <View style={bbStyle(varTop)}>
          <TouchableOpacity
            hitSlop={hitSlop}
            activeOpacity={constants.ACTIVE_OPACITY}
            style={styles.mapButton}
            onPress={() => this.getPermissions()}>
            <Text style={styles.findMeText}>Find Me</Text>
          </TouchableOpacity>
        </View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={this.state.region}
          showsUserLocation={true}>
          {this.state.markers !== undefined &&
            this.state.markers.map((marker, index) => {
              return (
                <Marker
                  key={'index' + index}
                  draggable
                  coordinate={marker}
                  onDragEnd={e =>
                    alert(JSON.stringify(e.nativeEvent.coordinate))
                  }
                  title={'Test Marker'}
                  description={'This is a description of the marker'}
                />
              );
            })}
          {polyline}
        </MapView>
      </View>
    );
  }
}

export default connect()(MapPage);
