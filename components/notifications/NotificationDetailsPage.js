import React, {Component} from 'react';
//import {View, ActivityIndicator, Text} from 'react-native';

import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Input, Icon, ButtonGroup, Button} from 'react-native-elements';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {notificationActions} from '../../redux/actions/notifications.actions';
import {workersActions} from '../../redux/actions/workers.actions';
import {rankActions} from '../../redux/actions/rank.actions';

import defaultStyles from '../common/styles';
import formStyles from '../common/form.styles';
import * as constants from '../common/constants';
import {isString, isEmpty, isUndefined} from 'lodash';
import {Actions} from 'react-native-router-flux';

class NotificationsDetailsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      isCommentValid: true,
      isAccepted: 0,
      stars: 1,
      respiringOnNotification: false,
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
      case constants.NOTIFICATION_TYPE.JOB_CONFIRMED:
        return <Text style={formStyles.name}>Job is finished!</Text>;
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
      case constants.NOTIFICATION_TYPE.JOB_CONFIRMED:
        return (
          <Text style={formStyles.description}>
            Congratulation! Your job is finished, please add your rank!
          </Text>
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
      case constants.NOTIFICATION_TYPE.JOB_CONFIRMED:
        let splittedMessage = additionalInfo.message.split('|');
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
            <Text style={formStyles.additionalInfo}>
              When: {splittedMessage[0]},
            </Text>
            <Text style={formStyles.additionalInfo}>
              Where: {splittedMessage[1]},
            </Text>
            <Text style={formStyles.additionalInfo}>
              Comment: {splittedMessage[2]}
            </Text>
            {isString(
              splittedMessage[4] && !isEmpty(splittedMessage[4]) && (
                <Text style={formStyles.description}>
                  Worker Response: {splittedMessage[4]}
                </Text>
              ),
            )}
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
    this.setState({respiringOnNotification: true});
    this.props.actions.hireWorkerResponse(
      this.props.additionalInfo.itemId,
      this.state.isAccepted === 0,
      this.state.comment,
      this.props.authToken,
    );
  };

  confirmJob = () => {
    this.setState({respiringOnNotification: true});
    this.props.actions.confirmJob(
      this.props.additionalInfo.itemId,
      this.props.additionalInfo.workerId,
      this.props.authToken,
    );
  };

  submitRank = () => {
    this.setState({respiringOnNotification: true});
    this.props.actions.addRank(
      this.props.additionalInfo.userId,
      this.state.stars,
      this.state.comment,
      this.props.notification.id,
      this.props.authToken,
    );
  };

  getActions = (type, additionalInfo) => {
    switch (type) {
      case constants.NOTIFICATION_TYPE.HIRE_REQUEST:
        if (
          additionalInfo.itemStatus !== constants.HIRE_REQUEST_STATUS.PENDING
        ) {
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
        if (
          additionalInfo.itemStatus !== constants.HIRE_REQUEST_STATUS.ACCEPTED
        ) {
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
      case constants.NOTIFICATION_TYPE.JOB_CONFIRMED:
        if (additionalInfo.ranked) {
          return (
            <Text style={formStyles.description}>
              You have already aded your rank!
            </Text>
          );
        }
        const star1icon =
          this.state.stars >= 1
            ? require('../images/full-star.png')
            : require('../images/empty-star.png');
        const star2icon =
          this.state.stars >= 2
            ? require('../images/full-star.png')
            : require('../images/empty-star.png');
        const star3icon =
          this.state.stars >= 3
            ? require('../images/full-star.png')
            : require('../images/empty-star.png');
        const star4icon =
          this.state.stars >= 4
            ? require('../images/full-star.png')
            : require('../images/empty-star.png');
        const star5icon =
          this.state.stars === 5
            ? require('../images/full-star.png')
            : require('../images/empty-star.png');
        return (
          <>
            <View style={formStyles.starContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({stars: 1});
                }}>
                <Image style={formStyles.star} source={star1icon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({stars: 2});
                }}>
                <Image style={formStyles.star} source={star2icon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({stars: 3});
                }}>
                <Image style={formStyles.star} source={star3icon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({stars: 4});
                }}>
                <Image style={formStyles.star} source={star4icon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({stars: 5});
                }}>
                <Image style={formStyles.star} source={star5icon} />
              </TouchableOpacity>
            </View>
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
            <Button
              buttonStyle={formStyles.loginButton}
              containerStyle={{marginTop: 32, flex: 0}}
              activeOpacity={0.8}
              title={'SUBMIT'}
              onPress={this.submitRank}
              titleStyle={formStyles.loginTextButton}
              loading={this.props.rankIsLoading}
              disabled={this.props.rankIsLoading}
            />
          </>
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

    if (type === constants.NOTIFICATION_TYPE.JOB_CONFIRMED) {
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

    if (type === constants.NOTIFICATION_TYPE.JOB_CONFIRMED) {
      return true;
    }

    return false;
  };

  renderScreen(isLoading) {
    if (
      isLoading ||
      isUndefined(this.props.notification) ||
      isUndefined(this.props.notification.type)
    ) {
      return (
        <View style={defaultStyles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
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
                {this.additionalInfoExists(this.props.notification.type) && (
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
    }
  }

  render() {
    if (
      !this.props.workerIsLoading &&
      !this.props.rankIsLoading &&
      this.state.respiringOnNotification &&
      isUndefined(this.props.workerError) &&
      isUndefined(this.rankError)
    ) {
      Actions.pop();
    }
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
    rankIsLoading: state.rank.isLoading,
    workerError: state.workers.error,
    rankError: state.rank.error,
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
      addRank: bindActionCreators(rankActions.addRank, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationsDetailsPage);
