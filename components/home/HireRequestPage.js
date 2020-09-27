import React, {Component} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {workersActions} from '../../redux/actions/workers.actions';

import styles from '../common/form.styles';
import {isUndefined} from 'lodash';
import {Actions} from 'react-native-router-flux';

class HireRequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      when: '',
      where: '',
      comment: '',
      isWhenValid: true,
      isWhereValid: true,
      isCommentValid: true,
      hiringWorker: false,
    };

    this._submit = this._submit.bind(this);
  }

  _validateWhen(when) {
    var re = /^.*$/;
    return re.test(when);
  }

  _validateWhere(where) {
    var re = /^.*$/;
    return re.test(where);
  }

  _validateComment(comment) {
    var re = /^.*$/;
    return re.test(comment);
  }

  _submit() {
    const {when, where, comment} = this.state;
    this.setState({
      isWhenValid: this._validateWhen(when) || this.whenInput.shake(),
      isWhereValid: this._validateWhere(where) || this.whereInput.shake(),
      isCommentValid: this._validateComment(comment) || this.whereInput.shake(),
    });

    if (
      !this.state.isWhenValid ||
      !this.state.isWhereValid ||
      !this.state.isCommentValid
    ) {
      return;
    }

    this.setState({hiringWorker: true});

    this.props.actions.hireWorker(
      this.props.worker.id,
      `${when}|${where}|${comment}`,
      this.props.authToken,
    );
  }

  componentDidUpdate() {
    if (
      this.state.hiringWorker &&
      !this.props.isLoading &&
      isUndefined(this.props.error)
    ) {
      Actions.pop({hiredWorker: true, workerId: this.props.hiredWorkerId});
    }
  }

  render() {
    if (this.props.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <KeyboardAvoidingView style={styles.container}>
        <ImageBackground
          source={require('../images/background.png')}
          style={styles.bgImage}>
          <ScrollView contentContainerStyle={styles.loginContainer}>
            <View style={styles.formContainer}>
              <Input
                leftIcon={
                  <Icon
                    name="clock-o"
                    type="font-awesome"
                    color="rgba(0, 0, 0, 0.38)"
                    size={25}
                    style={styles.transparent}
                  />
                }
                value={this.state.when}
                keyboardAppearance="light"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                inputStyle={{marginLeft: 10}}
                placeholder={'When'}
                containerStyle={{
                  borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                }}
                ref={input => (this.whenInput = input)}
                onSubmitEditing={() => this.whenInput.focus()}
                onChangeText={when => this.setState({when})}
                errorMessage={
                  this.state.isWhenValid ? null : "The field can't be empty"
                }
              />
              <Input
                leftIcon={
                  <Icon
                    name="map-marker"
                    type="font-awesome"
                    color="rgba(0, 0, 0, 0.38)"
                    size={25}
                    style={styles.transparent}
                  />
                }
                value={this.state.where}
                keyboardAppearance="light"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                inputStyle={{marginLeft: 10}}
                placeholder={'Where'}
                containerStyle={{
                  borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                }}
                ref={input => (this.whereInput = input)}
                onSubmitEditing={() => this.whereInput.focus()}
                onChangeText={where => this.setState({where})}
                errorMessage={
                  this.state.isWhereValid ? null : "The field can't be empty"
                }
              />
              <Input
                leftIcon={
                  <Icon
                    name="edit"
                    type="font-awesome"
                    color="rgba(0, 0, 0, 0.38)"
                    size={25}
                    style={styles.transparent}
                  />
                }
                value={this.state.comment}
                keyboardAppearance="light"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                inputStyle={{marginLeft: 10}}
                placeholder={'Comment'}
                containerStyle={{
                  borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                }}
                ref={input => (this.commentInput = input)}
                onSubmitEditing={() => this.commentInput.focus()}
                onChangeText={comment => this.setState({comment})}
                errorMessage={
                  this.state.isCommentValid ? null : "The field can't be empty"
                }
                multiline={true}
                numberOfLines={5}
              />
            </View>
            <Button
              buttonStyle={styles.loginButton}
              containerStyle={{marginTop: 32, flex: 0}}
              activeOpacity={0.8}
              title={'HIRE'}
              onPress={this._submit}
              titleStyle={styles.loginTextButton}
              loading={this.props.isLoading}
              disabled={this.props.isLoading}
            />
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.workers.isLoading,
    hiredWorkerId: state.workers.workerId,
    error: state.workers.error,
    authToken: state.user.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      hireWorker: bindActionCreators(workersActions.hireWorker, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HireRequestPage);
