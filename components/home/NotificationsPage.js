import React, {Component} from 'react';
import {Text} from 'react-native';

import {connect} from 'react-redux';

class NotificationsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Text>Notifications</Text>;
  }
}

export default connect()(NotificationsPage);
