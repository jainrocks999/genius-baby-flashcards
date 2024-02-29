import React, {useEffect, useRef, useState} from 'react';
import {View, Image, StatusBar, TouchableOpacity} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {navigationParams} from '../../navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import styles from './styles';
import {useSelector} from 'react-redux';
import {rootState} from '../../redux/store';
import utils from '../../utils';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
type Props = StackScreenProps<navigationParams, 'Detail_Screen'>;
const Detials: React.FC<Props> = () => {
  const data = useSelector((state: rootState) => state.data.cat_data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const translationX = useSharedValue(0);
  const changeImageWithAnimation = (direction: string) => {
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < data.length) {
      palySound(newIndex);
      setCurrentIndex(newIndex);
      translationX.value = direction === 'next' ? +300 : -300;
      translationX.value = withTiming(0, {
        duration: 300,
        easing: Easing.ease,
      });
    }
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translationX.value}],
    };
  });
  const palySound = async (index: number) => {
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
    await utils.player(track);
  };
  useEffect(() => {
    palySound(currentIndex);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#a4a6a5'} />
      <View style={styles.mainContainer}>
        <Header
          title={data[currentIndex].Title}
          ishome={false}
          isSetting={false}
        />
        <PanGestureHandler
          onGestureEvent={({nativeEvent}) => {
            translationX.value = nativeEvent.translationX;
          }}
          onHandlerStateChange={({nativeEvent}) => {
            if (nativeEvent.state === State.END) {
              if (nativeEvent.translationX > 50 && currentIndex > 0) {
                changeImageWithAnimation('prev');
              } else if (
                nativeEvent.translationX < -50 &&
                currentIndex < data.length - 1
              ) {
                changeImageWithAnimation('next');
              }
              translationX.value = withTiming(0, {
                duration: 300,
                easing: Easing.ease,
              });
            }
          }}>
          <Animated.View style={[styles.cat_image, animatedStyle]}>
            <Image
              style={styles.img}
              source={{uri: `${utils.path}${data[currentIndex].Image}.jpg`}}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => changeImageWithAnimation('prev')}
          style={styles.btn}>
          <Image
            style={styles.img}
            resizeMode="stretch"
            source={require('../../assets/Image_icons/previous_btn.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            palySound(currentIndex);
          }}
          style={styles.btn}>
          <Image
            resizeMode="contain"
            style={[styles.img, {height: '85%'}]}
            source={require('../../assets/Image_icons/repeat.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => changeImageWithAnimation('next')}
          style={styles.btn}>
          <Image
            style={styles.img}
            resizeMode="stretch"
            source={require('../../assets/Image_icons/next_btn.png')}
          />
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
