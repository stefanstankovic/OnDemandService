import {Platform, Dimensions} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const NAVBAR_HEIGHT = 64;
export const STATUS_BAR_HEIGHT = Platform.select({ios: 0, android: 0});

export const LATITUDE_DELTA = 0.05;
export const LONGITUDE_DELTA = 0.01;
export const ACTIVE_OPACITY = 0.7;

export const SETTINGS_PROPERTIES = {
  EMAIL_ADDRESS: 'email-field',
  PHONE: 'phone-field',
  PASSWORD: 'password-field',
  FIRST_NAME: 'first-name-field',
  LAST_NAME: 'last-name-field',
  PUSH_NOTIFICATIONS: 'push-notifications-switch',
};

export const SETTINGS_DIALOG_INPUT_TYPES = {
  DEFAULT: null,
  NUMERIC: 'numeric',
  NUMBERS_AND_PUNCTUATION: 'numbers-and-punctuation',
  NUMERIC_PASSWORD: 'numeric-password',
  EMAIL_ADDRESS: 'email-address',
  PASSWORD: 'password',
  PHONE_PAD: 'phone-pad',
  DECIMAL_PAD: 'decimal-pad',
};

const headerMaxHeight = SCREEN_HEIGHT * 0.61;
const headerMinHeight = Platform.OS === 'ios' ? 60 : 73;
const headerScrollDistance = headerMaxHeight - headerMinHeight;

export const PROFILE = {
  HEADER_MAX_HEIGHT: headerMaxHeight,
  HEADER_MIN_HEIGHT: headerMinHeight,
  HEADER_SCROLL_DISTANCE: headerScrollDistance,
};

export const NOTIFICATION_TYPE = {
  HIRE_REQUEST: 'hireRequest',
  HIRE_ACCEPTED: 'hireAccepted',
  HIRE_REJECTED: 'hireRejected',
  JOB_CONFIRMED: 'jobConfirmed',
};

export const HIRE_REQUEST_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'declined',
  CONFIRMS: 'confirmed',
};

export const ASYNC_STORE_KEYS = {
  USER: 'user',
  AUTH_TOKEN: 'auth-token',
  DEVICE_TOKEN: 'device-token',
};
