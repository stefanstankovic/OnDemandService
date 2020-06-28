import {StyleSheet, Platform} from 'react-native';
import * as constants from './constants';
import colors from './colors';

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.profileHeaderBackground,
    overflow: 'hidden',
    height: constants.PROFILE.HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: constants.PROFILE.HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? constants.PROFILE.HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: colors.profileRawBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    backgroundColor: colors.profileRawBackground,
    height: 200,
  },
  profileAvatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    alignSelf: 'center',
    marginTop: 70,
  },
  profileName: {
    fontSize: 22,
    color: colors.profileName,
    fontWeight: '600',
  },
  profileBody: {
    marginTop: 0,
  },
  profileBodyContent: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  profileInfo: {
    marginTop: 10,
    fontSize: 16,
    color: colors.profileInfo,
  },
  profileDescription: {
    fontSize: 16,
    color: colors.profileDescription,
    marginTop: 10,
    textAlign: 'center',
  },
  profilButtonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: colors.profileButton,
  },
});

export default styles;
