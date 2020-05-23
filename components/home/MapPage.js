import React, {Component} from 'react';
import {Text} from 'react-native';

import {connect} from 'react-redux';

class MapPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Text>Map</Text>;
  }
}

export default connect()(MapPage);
