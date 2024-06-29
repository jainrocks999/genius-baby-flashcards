import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {navigationParams} from '../../navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import styles from './styles';
import {useSelector} from 'react-redux';
import {rootState} from '../../redux/store';
import utils from '../../utils';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {isTablet} from 'react-native-device-info';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import TrackPlayer from 'react-native-track-player';
import {useIsFocused} from '@react-navigation/native';
import {heightPercent} from '../../utils/responsive';
type Props = StackScreenProps<navigationParams, 'Detail_Screen'>;
const Detials: React.FC<Props> = ({navigation}) => {
  const data = useSelector((state: rootState) => state.data.cat_data);
  const back_sound = useSelector((state: rootState) => state.data.back_sound);
  const setting = useSelector((state: rootState) => state.data.setting_data);

  const [currentIndex, setCurrentIndex] = useState(0);
  const translationX = useSharedValue(0);
  const [count, setCount] = useState(0);
  const changeImageWithAnimation = async (direction: string) => {
    setCount(pre => (direction == 'next' ? pre + 1 : pre - 1));
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < data.length) {
      setCurrentIndex(newIndex);
      translationX.value = direction === 'next' ? +300 : -300;
      translationX.value = withTiming(0, {
        duration: 300,
        easing: Easing.ease,
      });
      palySound(newIndex, '');
    } else {
      await TrackPlayer.reset();
      utils.showAdd();
      navigation.replace('Next_Screen');
    }
  };
  const tablet = isTablet();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translationX.value}],
    };
  });
  const palySound = async (index: number, butn: string) => {
    const track = {
      url: `${utils.path}${data[index].Sound}`,
      title: data[currentIndex].Title,
      artist: 'eFlashApps',
      album: 'eFlashApps',
      genre: 'welcome to geniues baby flash cards',
      date: new Date().toDateString(),
      artwork: `${utils.path}${data[index].Sound}`,
      duration: 4,
    };

    setting.Voice == '1' || butn == 'reapet' ? await utils.player(track) : null;
  };
  const fucused = useIsFocused();
  useEffect(() => {
    back_sound ? palySound(currentIndex, '') : null;
  }, [back_sound]);
  useEffect(() => {
    palySound(currentIndex, '');
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.reset({index: 0, routes: [{name: 'Home_Screen'}]});
        return true;
      },
    );
    return () => {
      backHandler.remove();
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#a4a6a5'} />
      <View style={styles.mainContainer}>
        <Header
          title={data[currentIndex].Title}
          ishome={false}
          isSetting={false}
          isMemory={false}
        />
        <View style={styles.imageContainer}>
          <PanGestureHandler
            onGestureEvent={({nativeEvent}) => {
              translationX.value = nativeEvent.translationX;
            }}
            onHandlerStateChange={({nativeEvent}) => {
              if (nativeEvent.state === State.END) {
                if (nativeEvent.translationX > 50 && currentIndex > 0) {
                  setting.Swipe == '1' && count != 0
                    ? changeImageWithAnimation('prev')
                    : null;
                } else if (
                  nativeEvent.translationX < -50 &&
                  currentIndex < data.length
                ) {
                  setting.Swipe == '1' && count != data.length
                    ? changeImageWithAnimation('next')
                    : null;
                }
                translationX.value = withTiming(0, {
                  duration: 300,
                  easing: Easing.ease,
                });
              }
            }}>
            <Animated.View
              style={[
                styles.cat_image,
                animatedStyle,
                tablet ? {marginTop: heightPercent(5)} : undefined,
              ]}>
              <Image
                resizeMode="contain"
                style={styles.img}
                source={{
                  uri: `${utils.path}${data[currentIndex].Image}`,
                }}
              />
            </Animated.View>
          </PanGestureHandler>
        </View>
      </View>
      <View style={[styles.btnContainer]}>
        <TouchableOpacity
          onPress={() => changeImageWithAnimation('prev')}
          disabled={currentIndex <= 0 || setting.Swipe == '1'}
          style={styles.btn}>
          {count > 0 && setting.Swipe != '1' ? (
            <Image
              style={styles.img}
              resizeMode="stretch"
              source={require('../../assets/Image_icons/previous_btn.png')}
            />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            palySound(currentIndex, 'reapet');
          }}
          style={styles.btn}>
          <Image
            resizeMode="contain"
            style={[styles.img, {height: '85%'}]}
            source={require('../../assets/Image_icons/repeat.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={count == data.length || setting.Swipe == '1'}
          onPress={() => changeImageWithAnimation('next')}
          style={styles.btn}>
          {setting.Swipe != '1' ? (
            <Image
              style={styles.img}
              resizeMode="stretch"
              source={require('../../assets/Image_icons/next_btn.png')}
            />
          ) : null}
        </TouchableOpacity>
      </View>
      <View style={{bottom: 0, width: '100%', alignItems: 'center'}}>
        <BannerAd
          unitId={utils.addIts.BANNER != undefined ? utils.addIts.BANNER : ''}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Detials;
