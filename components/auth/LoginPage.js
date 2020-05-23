// import EnterName from './App/Components/EnterName
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  Image,
  Dimensions,
} from 'react-native';

import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';

const unlockImg = require('../images/unlock.png');
const loginImg = require('../images/login.png');

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../redux/actions/user.actions';

const win = Dimensions.get('window');
const ratio = win.width / 603; //603 is actual image width

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    //this.onPressLearnMore = this.onPressLearnMore.bind(this);
    this.callLogin = this.callLogin.bind(this);
    this.onPressCreateAcc = this.onPressCreateAcc.bind(this);
    this.state = {
      isShowingLoader: false,
      username: '',
      password: '',
      isShowingWelcome: false,
    };
  }

  onPressCreateAcc = () => {
    Actions.register();
  };

  callLogin = async () => {
    const {loggedIn, actions} = this.props;

    if (this.state.username && this.state.password) {
      this.setState({isShowingLoader: true});

      try {
        if (!loggedIn) {
          actions.login(this.state.username, this.state.password);
        }
        this.setState({isShowingLoader: false});
      } catch (error) {
        console.log(error);
        this.setState({isShowingLoader: false});

        Alert.alert(
          'Error',
          'Something went wrong!',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      }
    } else {
      Alert.alert(
        'Error',
        'Please enter required fields!',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };

  render() {
    return (
      <View>
        <KeyboardAvoidingView behavior="position" disabled>
          <View
            style={{marginTop: 50, marginLeft: 'auto', marginRight: 'auto'}}>
            <Image
              style={{width: win.width, height: 166 * ratio}}
              source={loginImg}
            />
          </View>

          <View>
            <TextInput
              onChangeText={username => this.setState({username})}
              style={style.inputs}
              placeholder="Enter Username"
            />
          </View>

          <View>
            <TextInput
              onChangeText={password => this.setState({password})}
              secureTextEntry={true}
              style={style.inputs}
              placeholder="Enter Password"
            />
          </View>

          {/* <View>
          <Text style={{textAlign:'right',marginTop:10,marginRight:10}}
          onPress={this.props.onPressForgotPass}>
          Forgot Password? 
          </Text>
        </View>  */}

          {/* own buttons design */}
          <View style={[style.center, {marginTop: 20}]}>
            {!this.state.isShowingLoader && (
              <TouchableOpacity onPress={this.callLogin}>
                <Text style={style.textButton}>Login</Text>
              </TouchableOpacity>
            )}
            {this.state.isShowingLoader && <ActivityIndicator size="large" />}
          </View>

          <View style={style.center}>
            <TouchableOpacity>
              <Text
                style={{textAlign: 'center', padding: 20, margin: 10}}
                onPress={this.onPressCreateAcc}>
                create an Account ?
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const style = StyleSheet.create({
  inputs: {
    marginTop: 50,
    color: 'red',
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: 'red',
    borderBottomWidth: 2,
  },
  title: {
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
  },
  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textButton: {
    width: 140,
    padding: 10,
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
    borderRadius: 30,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'green',
  },
});

LoginPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    loggedIn: state.authentication.loggedIn,
    user: state.authentication.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      login: bindActionCreators(userActions.login, dispatch),
      logout: bindActionCreators(userActions.logout, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
