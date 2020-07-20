import {TouchableOpacity, Dimensions, Text, View} from 'react-native';
import React, {Component} from 'react';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Geolocation from '@react-native-community/geolocation';

import styles from '../common/styles';
import * as constants from '../common/constants';

import {locationActions} from '../../redux/actions/location.actions';
import {locationService} from '../../services/location.service';

class MapPage extends Component {
  regionChangedInterval = undefined;

  constructor(props) {
    super(props);
    this.state = {};
    this.onRegionChange = this.onRegionChange.bind(this);
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
      error => console.log(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  async componentDidMount() {
    if (await locationService.getPermissions()) {
      this.findMe();
    }

    this.props.actions.allWorkers(this.props.authToken);
    this.props.actions.subscribeOnLocationChange();
  }

  drawPoly(workers) {
    let workersWithLocation = workers.filter(
      worker => worker.location.length > 0,
    );
    return workersWithLocation.map((worker, index) => {
      const orderedLocation = [...worker.location];
      orderedLocation.sort((l1, l2) => {
        return new Date(l1.createdAt) - new Date(l2.createdAt);
      });

      const polyline = worker.location.map(({latitude, longitude}) => {
        return {
          latitude,
          longitude,
        };
      });
      return <Polyline key={'polyiline' + index} coordinates={polyline} />;
    });
  }

  addMarkers(workers) {
    let workersWithLocation = workers.filter(
      worker => worker.location.length > 0,
    );
    return workersWithLocation.map((worker, index) => {
      const {latitude, longitude} = worker.location[worker.location.length - 1];
      return (
        <Marker
          key={'index' + index}
          draggable
          coordinate={{latitude, longitude}}
          //onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
          title={worker.workerDetails.name ?? `Worker: ${index}`}
          description={worker.workerDetails.mobile ?? "mobile isn't set!"}
        />
      );
    });
  }

  onRegionChange(region) {
    if (this.regionChangedInterval) {
      clearInterval(this.regionChangedInterval);
    }
    this.regionChangedInterval = setInterval(() => {
      this.setState({region});
    }, 1000);
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

    return (
      <View style={styles.mapContainer}>
        <View style={bbStyle(varTop)}>
          <TouchableOpacity
            hitSlop={hitSlop}
            activeOpacity={constants.ACTIVE_OPACITY}
            style={styles.mapButton}
            onPress={() => this.findMe()}>
            <Text style={styles.findMeText}>Find Me</Text>
          </TouchableOpacity>
        </View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}>
          {this.addMarkers(this.props.workers)}
          {this.drawPoly(this.props.workers)}
        </MapView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    authToken: state.user.token,
    user: state.user.user,
    workers: state.location.workers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      allWorkers: bindActionCreators(locationActions.allWorkers, dispatch),
      subscribeOnLocationChange: bindActionCreators(
        locationActions.subscribeOnLocationChange,
        dispatch,
      ),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapPage);
