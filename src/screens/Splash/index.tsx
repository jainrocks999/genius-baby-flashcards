import {StyleSheet, Image, StatusBar, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {navigationParams} from '../../navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import utils from '../../utils';
type Props = StackScreenProps<navigationParams, 'SPlash_Screen'>;
const Splash: React.FC<Props> = ({navigation}) => {
  const track = {
    url: `${utils.path}eflashapps_sound.mp3`,
    title: 'eFalsh sound',
    artist: 'eFlashApps',
    album: 'eFlashApps',
    genre: 'welcome to geniues baby flash cards',
    date: new Date().toDateString(),
    artwork: `${utils.path}eflashapps_sound.mp3`,
    duration: 4,
  };
  useEffect(() => {
    navigate();
  }, []);
  const navigate = async () => {
    setTimeout(() => {
      navigation.replace('SPlash_ScreenII');
    }, 4000);
    await utils.player(track);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#f7fafa'} />
      <Image
        style={styles.imageContainer}
        resizeMode="stretch"
        source={require('../../assets/Image_Bg/splash2.jpg')}
      />
    </SafeAreaView>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: '100%',
    width: '100%',
  },
});
