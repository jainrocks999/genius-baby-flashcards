import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {navigationParams} from '../../navigation';
import styles from './styles';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import utils from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../../redux/store';
type Props = StackScreenProps<navigationParams, 'Next_Screen'>;
const Next: React.FC<Props> = ({navigation}) => {
  const {cate_name, setting_data} = useSelector(
    (state: rootState) => state.data,
  );
  const dispatch = useDispatch();
  const handleonPress = (name: string) => {
    dispatch({
      type: 'helper/setBackSound',
      payload: false,
    });
    if (name === 'repeat') {
      navigation.replace('Detail_Screen');
    } else if (name == 'next') {
      const ind = utils.Categoreis.findIndex(
        item => item.cate_name == cate_name,
      );
      handleOnDetails(ind + 1);
    } else {
      navigation.reset({index: 0, routes: [{name: 'Home_Screen'}]});
    }
  };

  const handleOnDetails = async (index: number) => {
    let name = utils.Categoreis[index]?.cate_name || 'home';
    let cate_data = await utils.db(
      'tbl_items',
      name,
      setting_data.RandomOrder == '1',
      0,
    );

    if (name != 'More') {
      dispatch({
        type: 'helper/set_cat_name',
        payload: name,
      });

      dispatch({
        type: 'helper/get_data_by_category',
        payload: cate_data,
        navigation,
      });
      navigation.replace('Detail_Screen');
    } else {
      navigation.reset({index: 0, routes: [{name: 'Home_Screen'}]});
    }
  };

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
      <ImageBackground
        style={styles.bg_container}
        resizeMode="stretch"
        source={require('../../assets/Image_Bg/bg.png')}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => handleonPress('repeat')}
            style={styles.btn}>
            <Image
              style={styles.image}
              source={require('../../assets/Image_icons/icon1.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleonPress('next')}
            style={styles.btn}>
            <Image
              style={styles.image}
              source={require('../../assets/Image_icons/icon2.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleonPress('home')}
            style={styles.btn}>
            <Image
              style={styles.image}
              source={require('../../assets/Image_icons/home_btn.png')}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.addContainer}>
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

export default Next;
