import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ImageBackground,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Input, Button, Icon, ButtonGroup} from 'react-native-elements';

const BG_IMAGE = require('../images/background.png');

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../redux/actions/user.actions';

import styles from '../common/form.styles';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({selected}) => {
  return (
    <View style={styles.selectorContainer}>
      <View style={selected && styles.selected} />
    </View>
  );
};

TabSelector.propTypes = {
  selected: PropTypes.bool.isRequired,
};

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      phoneNumber: '',
      isWorker: 0,
      selectedCategory: 0,
      isLoading: false,
      isEmailValid: true,
      isPhoneValid: true,
      isPasswordValid: true,
    };

    this.selectCategory = this.selectCategory.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.updateIsWorker = this.updateIsWorker.bind(this);
  }

  selectCategory(selectedCategory) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      selectedCategory,
      isLoading: false,
    });
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  updateIsWorker = index => {
    this.setState({isWorker: index});
  };

  validPhone(phone) {
    var re = /^(\+\d{1,3}[- ]?)?\d{5,10}$/;

    return re.test(phone);
  }

  login() {
    const {email, password} = this.state;
    this.setState({isLoading: true});

    this.setState({
      isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
      isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
    });

    if (this.state.isEmailValid && this.state.password) {
      this.props.actions.login(email, password);
    }

    this.setState({
      isLoading: false,
    });
  }

  signUp() {
    const {email, password, phoneNumber, isWorker} = this.state;
    this.setState({isLoading: true});

    this.setState({
      isLoading: false,
      isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
      isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
      isPhoneValid: this.validPhone(phoneNumber) || this.phoneNumber.shake(),
    });

    this.props.actions.register({
      email: email,
      mobile: phoneNumber,
      password: password,
      role: isWorker === 1 ? 'worker' : 'user',
    });
  }

  render() {
    const {
      selectedCategory,
      isLoading,
      isEmailValid,
      isPasswordValid,
      isPhoneValid,
      email,
      password,
      phoneNumber,
    } = this.state;
    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;

    const component1 = () => <Text>User</Text>;
    const component2 = () => <Text>Worker</Text>;
    const buttons = [{element: component1}, {element: component2}];

    return (
      <>
        <KeyboardAvoidingView style={styles.container}>
          <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
            <ScrollView contentContainerStyle={styles.loginContainer}>
              <View style={styles.titleContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.titleText}>ON DEMAND</Text>
                </View>
                <View style={{marginTop: -10, marginLeft: 10}}>
                  <Text style={styles.titleText}>SERVICE</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Button
                  disabled={this.props.isLoading}
                  type="clear"
                  activeOpacity={0.7}
                  onPress={() => this.selectCategory(0)}
                  containerStyle={{flex: 1}}
                  titleStyle={[
                    styles.categoryText,
                    isLoginPage && styles.selectedCategoryText,
                  ]}
                  title={'Login'}
                />
                <Button
                  disabled={this.props.isLoading}
                  type="clear"
                  activeOpacity={0.7}
                  onPress={() => this.selectCategory(1)}
                  containerStyle={{flex: 1}}
                  titleStyle={[
                    styles.categoryText,
                    isSignUpPage && styles.selectedCategoryText,
                  ]}
                  title={'Sign up'}
                />
              </View>
              <View style={styles.rowSelector}>
                <TabSelector selected={isLoginPage} />
                <TabSelector selected={isSignUpPage} />
              </View>
              <View style={styles.formContainer}>
                <Input
                  leftIcon={
                    <Icon
                      name="envelope-o"
                      type="font-awesome"
                      color="rgba(0, 0, 0, 0.38)"
                      size={25}
                      style={styles.transparent}
                    />
                  }
                  value={email}
                  keyboardAppearance="light"
                  autoFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  inputStyle={{marginLeft: 10}}
                  placeholder={'Email'}
                  containerStyle={{
                    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                  }}
                  ref={input => (this.emailInput = input)}
                  onSubmitEditing={() => this.emailInput.focus()}
                  onChangeText={email => this.setState({email})}
                  errorMessage={
                    isEmailValid ? null : 'Please enter a valid email address'
                  }
                />
                <Input
                  leftIcon={
                    <Icon
                      name="lock"
                      type="simple-line-icon"
                      color="rgba(0, 0, 0, 0.38)"
                      size={25}
                      style={styles.transparent}
                    />
                  }
                  value={password}
                  keyboardAppearance="light"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  returnKeyType={isSignUpPage ? 'next' : 'done'}
                  blurOnSubmit={true}
                  containerStyle={styles.inputContainerStyle}
                  inputStyle={{marginLeft: 10}}
                  placeholder={'Password'}
                  ref={input => (this.passwordInput = input)}
                  onSubmitEditing={() =>
                    isSignUpPage ? this.confirmationInput.focus() : this.login()
                  }
                  onChangeText={password => this.setState({password})}
                  errorMessage={
                    isPasswordValid
                      ? null
                      : 'Please enter at least 8 characters'
                  }
                />
                {isSignUpPage && (
                  <>
                    <Input
                      leftIcon={
                        <Icon
                          type="antdesign"
                          name="phone"
                          color="rgba(0, 0, 0, 0.38)"
                          size={25}
                          style={styles.transparent}
                        />
                      }
                      value={phoneNumber}
                      secureTextEntry={true}
                      keyboardAppearance="light"
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="phone-pad"
                      returnKeyType={'done'}
                      blurOnSubmit={true}
                      containerStyle={styles.inputContainerStyle}
                      inputStyle={{marginLeft: 10}}
                      placeholder={'Mobile'}
                      ref={input => (this.phoneNumber = input)}
                      onSubmitEditing={this.signUp}
                      onChangeText={phoneNumber => this.setState({phoneNumber})}
                      errorMessage={
                        isPhoneValid ? null : 'Please enter valid mobile phone'
                      }
                    />
                    <ButtonGroup
                      onPress={this.updateIsWorker}
                      selectedIndex={this.state.isWorker}
                      buttons={buttons}
                      containerStyle={styles.groupButton}
                    />
                  </>
                )}
                <Button
                  buttonStyle={styles.loginButton}
                  containerStyle={{marginTop: 32, flex: 0}}
                  activeOpacity={0.8}
                  title={isLoginPage ? 'LOGIN' : 'SIGN UP'}
                  onPress={isLoginPage ? this.login : this.signUp}
                  titleStyle={styles.loginTextButton}
                  loading={this.props.isLoading}
                  disabled={this.props.isLoading}
                />
              </View>
            </ScrollView>
          </ImageBackground>
        </KeyboardAvoidingView>
      </>
    );
  }
}

LoginPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    isLoading: state.user.isLoading,
    user: state.user.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      login: bindActionCreators(userActions.login, dispatch),
      logout: bindActionCreators(userActions.logout, dispatch),
      register: bindActionCreators(userActions.register, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
