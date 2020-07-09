import React, {Component} from 'react';
//import {View, ActivityIndicator, Text} from 'react-native';

import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import {Input, Icon, ButtonGroup, Button} from 'react-native-elements';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {notificationActions} from '../../redux/actions/notifications.actions';
import {workersActions} from '../../redux/actions/workers.actions';

import defaultStyles from '../common/styles';
import formStyles from '../common/form.styles';
import * as constants from '../common/constants';
import {Actions} from 'react-native-router-flux';

class NotificationsDetailsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      isCommentValid: true,
      isAccepted: 0,
    };

    this.props.actions.getNotification(
      this.props.notificationData.id,
      this.props.authToken,
    );

    this.submitHireRequest = this.submitHireRequest.bind(this);
    this.confirmJob = this.confirmJob.bind(this);
  }

  componentDidMount() {
    this.props.actions.getNotification(
      this.props.notificationData.id,
      this.props.authToken,
    );
  }

  getNotificationName(type) {
    switch (type) {
      case constants.NOTIFICATION_TYPE.HIRE_REQUEST:
        return <Text style={formStyles.name}>A new job request</Text>;
      case constants.NOTIFICATION_TYPE.HIRE_ACCEPTED:
        return <Text style={formStyles.name}>Your request is accepted!</Text>;
      case constants.NOTIFICATION_TYPE.HIRE_REJECTED:
        return <Text style={formStyles.name}>Your request is rejected!</Text>;
      default:
        return 'Notification';
    }
  }

  getNotificationDescription = (type, messageData) => {
    let messageObject = JSON.parse(messageData);
    switch (type) {
      case constants.NOTIFICATION_TYPE.HIRE_REQUEST:
        let splittedMessage = messageObject.message.split('|');
        return (
          <>
            <Text style={formStyles.description}>
              When: {splittedMessage[0]},
            </Text>
            <Text style={formStyles.description}>
              Where: {splittedMessage[1]},
            </Text>
            <Text style={formStyles.description}>
              Comment: {splittedMessage[2]}
            </Text>
          </>
        );
      case constants.NOTIFICATION_TYPE.HIRE_ACCEPTED:
      case constants.NOTIFICATION_TYPE.HIRE_REJECTED:
        return (
          <Text style={formStyles.description}>{messageObject.message}</Text>
        );
      default:
        return <View />;
    }
  };

  getAdditionalInfo = (type, additionalInfo) => {
    switch (type) {
      case constants.NOTIFICATION_TYPE.HIRE_REQUEST:
      case constants.NOTIFICATION_TYPE.HIRE_ACCEPTED:
      case constants.NOTIFICATION_TYPE.HIRE_REJECTED:
        return (
          <>
            <Text style={formStyles.additionalInfo}>
              User: {additionalInfo.user.firstName}{' '}
              {additionalInfo.user.lastName}
            </Text>
            <Text style={formStyles.additionalInfo}>
              User email: {additionalInfo.user.email}
            </Text>

            <Text style={formStyles.additionalInfo}>
              User mobile: {additionalInfo.user.mobile}
            </Text>
          </>
        );
      default:
        return <View />;
    }
  };

  updateIsAccepted = index => {
    this.setState({isAccepted: index});
  };

  submitHireRequest = () => {
    this.props.actions.hireWorkerResponse(
      this.props.additionalInfo.itemId,
      this.state.isAccepted === 0,
      this.state.comment,
      this.props.authToken,
    );
    Actions.reset('notificationsScreen');
  };

  confirmJob = () => {
    this.props.actions.confirmJob(
      this.props.additionalInfo.itemId,
      this.props.additionalInfo.workerId,
      this.props.authToken,
    );
    Actions.reset('notificationsScreen');
  };

  getActions = (type, additionalInfo) => {
    console.log(type);
    switch (type) {
      case constants.NOTIFICATION_TYPE.HIRE_REQUEST:
        if (additionalInfo !== constants.HIRE_REQUEST_STATUS.PENDING) {
          return (
            <Text style={formStyles.description}>
              Request is already processed!
            </Text>
          );
        }
        const component1 = () => <Text>Accept</Text>;
        const component2 = () => <Text>Decline</Text>;
        const buttons = [{element: component1}, {element: component2}];
        return (
          <>
            <Input
              leftIcon={
                <Icon
                  name="edit"
                  type="font-awesome"
                  color="rgba(0, 0, 0, 0.38)"
                  size={25}
                  style={formStyles.transparent}
                />
              }
              value={this.state.comment}
              keyboardAppearance="light"
              autoFocus={false}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              placeholder={'Comment'}
              ref={input => (this.commentInput = input)}
              onSubmitEditing={() => this.commentInput.focus()}
              onChangeText={comment => this.setState({comment})}
              errorMessage={
                this.state.isCommentValid ? null : "The field can't be empty"
              }
              multiline={true}
              numberOfLines={5}
            />
            <ButtonGroup
              onPress={this.updateIsAccepted}
              selectedIndex={this.state.isAccepted}
              buttons={buttons}
              containerStyle={formStyles.groupButton}
            />
            <Button
              buttonStyle={formStyles.loginButton}
              containerStyle={{marginTop: 32, flex: 0}}
              activeOpacity={0.8}
              title={'SUBMIT'}
              onPress={this.submitHireRequest}
              titleStyle={formStyles.loginTextButton}
              loading={this.props.isLoading || this.props.workerIsLoading}
              disabled={this.props.isLoading || this.props.workerIsLoading}
            />
          </>
        );
      case constants.NOTIFICATION_TYPE.HIRE_ACCEPTED:
        if (additionalInfo !== constants.HIRE_REQUEST_STATUS.ACCEPTED) {
          return (
            <Text style={formStyles.description}>
              Request is already confirmed!
            </Text>
          );
        }
        return (
          <Button
            buttonStyle={formStyles.loginButton}
            containerStyle={{marginTop: 32, flex: 0}}
            activeOpacity={0.8}
            title={'CONFIRM JOB'}
            onPress={this.confirmJob}
            titleStyle={formStyles.loginTextButton}
            loading={this.props.isLoading || this.props.workerIsLoading}
            disabled={this.props.isLoading || this.props.workerIsLoading}
          />
        );
      default:
        return <View />;
    }
  };

  additionalInfoExists = type => {
    if (type === constants.NOTIFICATION_TYPE.HIRE_REQUEST) {
      return true;
    }

    if (type === constants.NOTIFICATION_TYPE.HIRE_ACCEPTED) {
      return true;
    }

    return false;
  };

  actionsExists = type => {
    if (type === constants.NOTIFICATION_TYPE.HIRE_REQUEST) {
      return true;
    }

    if (type === constants.NOTIFICATION_TYPE.HIRE_ACCEPTED) {
      return true;
    }

    return false;
  };

  renderScreen(isLoading) {
    if (isLoading) {
      return (
        <View style={defaultStyles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      console.log(JSON.stringify(this.props.notification));
      switch (this.props?.notification?.type) {
        case constants.NOTIFICATION_TYPE.HIRE_REQUEST:
        case constants.NOTIFICATION_TYPE.HIRE_ACCEPTED:
        case constants.NOTIFICATION_TYPE.HIRE_REJECTED:
          return (
            <KeyboardAvoidingView style={formStyles.container}>
              <ImageBackground
                source={require('../images/background.png')}
                style={formStyles.bgImage}>
                <ScrollView>
                  <View style={formStyles.formContainer}>
                    {this.getNotificationName(this.props.notification.type)}
                    {this.getNotificationDescription(
                      this.props.notification.type,
                      this.props.notification.messageData,
                    )}
                    {this.additionalInfoExists(
                      this.props.notification.type,
                    ) && (
                      <>
                        {this.getAdditionalInfo(
                          this.props.notification.type,
                          this.props.additionalInfo,
                        )}
                      </>
                    )}
                    {this.actionsExists(this.props.notification.type) && (
                      <>
                        {this.getActions(
                          this.props.notification.type,
                          this.props.additionalInfo,
                        )}
                      </>
                    )}
                  </View>
                </ScrollView>
              </ImageBackground>
            </KeyboardAvoidingView>
          );
        default:
          return <Text>Notification</Text>;
      }
    }
  }

  render() {
    return this.renderScreen(this.props.isLoading);
  }
}

function mapStateToProps(state) {
  return {
    notification: state.notification.notification,
    additionalInfo: state.notification.additionalInfo,
    isLoading: state.notification.isLoading,
    authToken: state.user.token,
    workerIsLoading: state.workers.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      notificationDetailsClosed: bindActionCreators(
        notificationActions.notificationDetailsClosed,
        dispatch,
      ),
      getNotification: bindActionCreators(
        notificationActions.getNotification,
        dispatch,
      ),
      hireWorkerResponse: bindActionCreators(
        workersActions.hireResponse,
        dispatch,
      ),
      confirmJob: bindActionCreators(workersActions.confirmJob, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationsDetailsPage);
