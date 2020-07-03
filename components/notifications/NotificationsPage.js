import React, {Component} from 'react';
import {FlatList, TouchableOpacity, RefreshControl} from 'react-native';

import {ListItem, Header} from 'react-native-elements';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {notificationActions} from '../../redux/actions/notifications.actions';
import styles from '../common/styles';
import colors from '../common/colors';
import {Actions} from 'react-native-router-flux';

import * as constants from '../common/constants';

class NotificationsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.actions.allNotifications(this.props.authToken);
  };

  keyExtractor = (item, index) => index.toString();

  getNotificationTitle = type => {
    switch (type) {
      case 'hireRequest':
        return 'Work Request';
      default:
        return 'Notification';
    }
  };

  getNotificationSubtitle = (type, messageData) => {
    switch (type) {
      case 'hireRequest':
        let messageObject = JSON.parse(messageData);
        let splittedMessage = messageObject.message.split('|');
        let newMessage =
          `When: ${splittedMessage[0]}, ` +
          `Where: ${splittedMessage[1]}, ` +
          `Comment: ${splittedMessage[2]}`;

        return newMessage.substr(0, 30) + '...';
      default:
        return 'Notification';
    }
  };

  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => Actions.notificationDetails({notification: item})}>
      <ListItem
        title={this.getNotificationTitle(item.type)}
        subtitle={this.getNotificationSubtitle(item.type, item.messageData)}
        badge={{
          value: item.delivered ? '' : 'Unread',
          textStyle: {color: 'white'},
        }}
        bottomDivider
        chevron
      />
    </TouchableOpacity>
  );

  render() {
    return (
      <>
        <Header
          containerStyle={styles.headerContainer}
          centerComponent={{
            text: 'NOTIFICATIONS',
            style: {color: colors.white},
          }}
        />
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.props.notifications}
          renderItem={this.renderItem}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({refreshing: true});
                this.props.actions.allNotifications(this.props.authToken);
                this.setState({refreshing: false});
              }}
              // Android offset for RefreshControl
              progressViewOffset={constants.NAVBAR_HEIGHT}
            />
          }
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    notifications: state.notification.notifications,
    isLoading: state.notification.isLoading,
    authToken: state.user.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      allNotifications: bindActionCreators(
        notificationActions.allNotifications,
        dispatch,
      ),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationsPage);
