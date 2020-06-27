import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';

import {Text, BackHandler} from 'react-native';

import {connect} from 'react-redux';

class ProfileViewPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Text>ProfileViewPage</Text>;
  }
}

export default connect()(ProfileViewPage);
