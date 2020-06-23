import {StyleSheet, Platform} from 'react-native';
import * as constants from './constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scene: {
    backgroundColor: '#F5FCFF',
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
  tabBar: {
    height: 50,
    borderTopColor: 'darkgrey',
    borderTopWidth: 1,
    opacity: 0.98,
    justifyContent: 'space-between',
  },
  activeLabel: {
    color: '#c4e3cb',
    textDecorationLine: 'underline',
  },
  label: {
    fontSize: 20,
    color: '#f4f9f4',
  },
  icon: {
    width: 30,
  },
  fill: {
    flex: 1,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: constants.NAVBAR_HEIGHT,
    justifyContent: 'center',
    paddingTop: constants.STATUS_BAR_HEIGHT,
  },
  headerContainer: {
    paddingTop: constants.STATUS_BAR_HEIGHT,
  },
  contentContainer: {
    paddingTop: constants.NAVBAR_HEIGHT,
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
    color: '#333333',
  },
  row: {
    height: 300,
    width: null,
    marginBottom: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  rowText: {
    color: 'white',
    fontSize: 18,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  findMeText: {
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    color: 'white',
  },
  map: {
    flex: 1,
    zIndex: -1,
  },
  mapButton: {
    width: 75,
    height: 75,
    borderRadius: 85,
    backgroundColor: 'rgba(252, 253, 253, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowRadius: 8,
    shadowOpacity: 0.12,
    opacity: 0.6,
    zIndex: 10,
  },
  exitAnimatedView: {
    width: constants.SCREEN_WIDTH,
    backgroundColor: '#0a5386',
    elevation: 2,
    position: 'absolute',
    bottom: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  exitTitleText: {
    textAlign: 'center',
    color: '#ffffff',
    marginRight: 10,
  },
  exitText: {
    color: '#e5933a',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
});

export default styles;
