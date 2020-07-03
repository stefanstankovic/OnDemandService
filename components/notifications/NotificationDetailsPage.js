import React, {Component} from 'react';
import {Text} from 'react-native';

import {connect} from 'react-redux';
class NotificationsDetailsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Text>Notifications Details</Text>;
  }
}

export default connect()(NotificationsDetailsPage);
