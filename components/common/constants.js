import {Platform, Dimensions} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const NAVBAR_HEIGHT = 64;
export const STATUS_BAR_HEIGHT = Platform.select({ios: 0, android: 0});

export const LATITUDE_DELTA = 0.05;
export const LONGITUDE_DELTA = 0.01;
export const ACTIVE_OPACITY = 0.7;
