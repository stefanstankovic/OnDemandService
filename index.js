/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './components/App';
import {name as appName} from './app.json';
import {Provider as ReduxProvider} from 'react-redux';
import configureStore from './redux/configureStore';

const store = configureStore();

const Root = () => {
  return (
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
