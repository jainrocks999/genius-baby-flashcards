import {
  View,
  Text,
  LogBox,
  BackHandler,
  ToastAndroid,
  AppState,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import App from './navigation';
import {Provider} from 'react-redux';
import store from './redux/store';
import utils from './utils';

const Root = () => {
  useEffect(() => {
    const handleAppStateChange = async (nextAppState: string) => {
      if (nextAppState === 'active') {
        utils.showAdd();
      } else if (nextAppState === 'background') {
        await utils.resetPlayer();
      }
    };

    const remove = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      remove.remove();
    };
  }, []);

  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;
