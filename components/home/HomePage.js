import React, {Component} from 'react';
import {Text} from 'react-native';

import {connect} from 'react-redux';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Text>Home</Text>;
  }
}

export default connect()(HomePage);
