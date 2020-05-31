import {Platform} from 'react-native';

export const NAVBAR_HEIGHT = 64;
export const STATUS_BAR_HEIGHT = Platform.select({ios: 0, android: 0});

export const LATITUDE_DELTA = 0.005;
export const LONGITUDE_DELTA = 0.001;
export const ACTIVE_OPACITY = 0.7;
