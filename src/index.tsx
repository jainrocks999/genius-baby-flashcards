import {View, Text, LogBox} from 'react-native';
import React from 'react';
import App from './navigation';
import {Provider} from 'react-redux';
import store from './redux/store';

const Root = () => {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;
