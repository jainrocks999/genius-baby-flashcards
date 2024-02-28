import React, {useEffect} from 'react';
import {StyleSheet, Image, StatusBar} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {navigationParams} from '../../navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
type Props = StackScreenProps<navigationParams, 'SPlash_ScreenII'>;
const SplashII: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({index: 0, routes: [{name: 'Home_Screen'}]});
    }, 1000);
  }, []);

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
  },
  imageContainer: {
    height: '100%',
    width: '100%',
  },
});
