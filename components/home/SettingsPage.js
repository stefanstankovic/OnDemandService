import React, {Component} from 'react';
import {ScrollView, Platform} from 'react-native';

import {
  SettingsCategoryHeader,
  SettingsDividerLong,
  SettingsEditText,
  SettingsDividerShort,
  SettingsSwitch,
} from 'react-native-settings-components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {userActions} from '../../redux/actions/user.actions';

import * as colors from '../common/colors';
import {
  SETTINGS_PROPERTIES,
  SETTINGS_DIALOG_INPUT_TYPES,
} from '../common/constants';
import styles from '../common/styles';

class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      gender: '',
      allowPushNotifications: false,
    };

    this.onValueChangeHandler = this.onValueChangeHandler.bind(this);
  }

  componentDidMount() {
    this.props.actions.getUserDetails(this.props.user.id, this.props.authToken);
  }

  onValueChangeHandler(property, value) {
    let user = {...this.props.user};
    let userDetails = {...this.props.userDetails};

    switch (property) {
      case SETTINGS_PROPERTIES.EMAIL_ADDRESS:
        user.email = value;
        this.props.actions.updateUser(user, this.props.authToken);
        break;
      case SETTINGS_PROPERTIES.PHONE:
        user.mobile = value;
        this.props.actions.updateUser(user, this.props.authToken);
        break;
      case SETTINGS_PROPERTIES.PASSWORD:
        user.email = value;
        this.props.actions.updateUser(user, this.props.authToken);
        break;
      case SETTINGS_PROPERTIES.FIRST_NAME:
        userDetails.firstName = value;
        this.props.actions.updateUserDetails(userDetails, this.props.authToken);
        break;
      case SETTINGS_PROPERTIES.LAST_NAME:
        userDetails.lastName = value;
        this.props.actions.updateUserDetails(userDetails, this.props.authToken);
        break;
      case SETTINGS_PROPERTIES.PUSH_NOTIFICATIONS:
        this.setState({allowPushNotifications: value});
        break;
    }
  }

  render() {
    return (
      <ScrollView style={styles.settingsScroll}>
        <SettingsCategoryHeader
          title={'My Account'}
          textStyle={Platform.OS === 'android' ? {color: colors.monza} : null}
        />
        <SettingsDividerLong android={false} />
        <SettingsEditText
          title="Email"
          dialogDescription={'Enter your username.'}
          valuePlaceholder="..."
          positiveButtonTitle={'...'}
          negativeButtonTitle={'Cancel'}
          buttonRightTitle={'Save'}
          androidDialogInputType={SETTINGS_DIALOG_INPUT_TYPES.EMAIL_ADDRESS}
          onValueChange={value =>
            this.onValueChangeHandler(SETTINGS_PROPERTIES.EMAIL_ADDRESS, value)
          }
          value={this.props.user.email}
        />
        <SettingsEditText
          title="Phone"
          dialogDescription={'Enter your username.'}
          valuePlaceholder="..."
          positiveButtonTitle={'...'}
          negativeButtonTitle={'Cancel'}
          buttonRightTitle={'Save'}
          androidDialogInputType={SETTINGS_DIALOG_INPUT_TYPES.PHONE_PAD}
          onValueChange={value =>
            this.onValueChangeHandler(SETTINGS_PROPERTIES.PHONE, value)
          }
          value={this.props.user.mobile || '...'}
        />
        <SettingsEditText
          title="Password"
          dialogDescription={'Enter your username.'}
          valuePlaceholder="..."
          positiveButtonTitle={'...'}
          negativeButtonTitle={'Cancel'}
          buttonRightTitle={'Save'}
          androidDialogInputType={SETTINGS_DIALOG_INPUT_TYPES.PASSWORD}
          onValueChange={value =>
            this.onValueChangeHandler(SETTINGS_PROPERTIES.PASSWORD, value)
          }
          value={'*********'}
        />
        <SettingsEditText
          title="First Name"
          dialogDescription={'Enter your username.'}
          valuePlaceholder="..."
          positiveButtonTitle={'...'}
          negativeButtonTitle={'Cancel'}
          buttonRightTitle={'Save'}
          onValueChange={value =>
            this.onValueChangeHandler(SETTINGS_PROPERTIES.FIRST_NAME, value)
          }
          value={this.props.userDetails.firstName || '...'}
        />
        <SettingsEditText
          title="Last Name"
          dialogDescription={'Enter your username.'}
          valuePlaceholder="..."
          positiveButtonTitle={'...'}
          negativeButtonTitle={'Cancel'}
          buttonRightTitle={'Save'}
          onValueChange={value =>
            this.onValueChangeHandler(SETTINGS_PROPERTIES.LAST_NAME, value)
          }
          value={this.props.userDetails.lastName || '...'}
        />
        <SettingsDividerShort />
        <SettingsSwitch
          title={'Allow Push Notifications'}
          onValueChange={value =>
            this.onValueChangeHandler(
              SETTINGS_PROPERTIES.PUSH_NOTIFICATIONS,
              value,
            )
          }
          value={this.state.allowPushNotifications}
          trackColor={{
            true: colors.switchEnabled,
            false: colors.switchDisabled,
          }}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    user: state.user.user,
    authToken: state.user.token,
    userDetails: state.userDetails.userDetails,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getUserDetails: bindActionCreators(userActions.getUserDetails, dispatch),
      updateUserDetails: bindActionCreators(
        userActions.updateUserDetails,
        dispatch,
      ),
      updateUser: bindActionCreators(userActions.updateUser, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsPage);
