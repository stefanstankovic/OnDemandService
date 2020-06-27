import React, {Component} from 'react';
import {Text} from 'react-native';

import {connect} from 'react-redux';

class ProfileEditPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Text>ProfileEditPage</Text>;
  }
}

export default connect()(ProfileEditPage);
