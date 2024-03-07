import React, {useEffect} from 'react';
import {StyleSheet, Image, StatusBar} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {navigationParams} from '../../navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import utils from '../../utils';
import {useDispatch} from 'react-redux';
type Props = StackScreenProps<navigationParams, 'SPlash_ScreenII'>;
const SplashII: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      handleOnSetting();
    }, 1000);
  }, []);
  const handleOnSetting = async () => {
    const settings = await utils.db('tbl_settings', null, false, 0);
    dispatch({
      type: 'helper/get_setting_from_db',
      payload: settings[0],
    });
    navigation.reset({index: 0, routes: [{name: 'Home_Screen'}]});
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#2596be'} />
      <Image
        style={styles.imageContainer}
        resizeMode="stretch"
        source={require('../../assets/Image_Bg/splash.png')}
      />
    </SafeAreaView>
  );
};

export default SplashII;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2596be',
  },
  imageContainer: {
    height: '100%',
    width: '100%',
  },
});
