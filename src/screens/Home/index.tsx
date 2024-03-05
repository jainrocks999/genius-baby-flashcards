import React, {useEffect, useRef} from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {navigationParams} from '../../navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import Header from '../../components/Header';
import CategoryList from '../../components/List_home';
import utils from '../../utils';
import {useDispatch} from 'react-redux';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {useSelector} from 'react-redux';
import {rootState} from '../../redux/store';

type Props = StackScreenProps<navigationParams, 'Home_Screen'>;
const Home: React.FC<Props> = ({navigation}) => {
  const setting = useSelector((state: rootState) => state.data.setting_data);
  const screens = useSelector((state: rootState) => state.data.screens);
  const dispatch = useDispatch();
  const settting = useSelector((state: rootState) => state.data.setting_data);

  const doublePressTimeout = useRef<number | null>(null);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (
          doublePressTimeout.current &&
          doublePressTimeout.current + 2000 >= Date.now()
        ) {
          utils.showAdd();
          BackHandler.exitApp();
          return true;
        } else {
          ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
          doublePressTimeout.current = Date.now();
          return true;
        }
      },
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const getCatDetails = async (item: (typeof utils.Categoreis)[0] | string) => {
    await utils.resetPlayer();
    dispatch({
      type: 'helper/set_cat_name',
      payload: typeof item == 'object' ? item.cate_name : null,
    });

    setting.Game != '1' ? handleonDetails(item) : handleOnMamory(item);
  };
  const handleonDetails = async (
    item: (typeof utils.Categoreis)[0] | string,
  ) => {
    dispatch({
      type: 'helper/setBackSound',
      payload: false,
    });
    let cate_data;
    if (typeof item == 'object') {
      cate_data = await utils.db(
        'tbl_items',
        item.cate_name,
        setting.RandomOrder == '1',
        0,
      );
    } else {
      cate_data = await utils.db('tbl_items', null, false, 0);
    }
    console.log(JSON.stringify(cate_data));

    dispatch({
      type: 'helper/get_data_by_category',
      payload: cate_data,
      navigation,
    });
    navigation.navigate('Detail_Screen');
  };
  const handleOnMamory = async (
    item: (typeof utils.Categoreis)[0] | string,
  ) => {
    let length =
      settting.GameLevel == '1' ? 3 : settting.GameLevel == '2' ? 4 : 6;
    let cate_data;
    if (typeof item == 'object') {
      cate_data = await utils.getMemory(length, item.cate_name);
    } else {
      cate_data = await utils.getMemory(length, null);
    }
    dispatch({
      type: 'helper/get_memory_data_from_db',
      payload: cate_data,
    });
    navigation.navigate('Memory_Screen');
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#2596be'} />
      <ImageBackground
        resizeMethod="scale"
        resizeMode="stretch"
        style={styles.mainBackground}
        source={require('../../assets/Image_Bg/screen.png')}>
        <Header isMemory={false} title="" ishome isSetting={false} />
        <ScrollView contentContainerStyle={styles.containerStyle}>
          <View
            style={{width: '100%', alignSelf: 'center', alignItems: 'center'}}>
            <CategoryList
              onPress={getCatDetails}
              data={utils.Categoreis.slice(0, 14)}
            />
            <TouchableOpacity
              onPress={() => {
                dispatch({
                  type: 'helper/set_cat_name',
                  payload: 'allInOne',
                });
                handleOnMamory('allInOne');
              }}
              style={styles.allIntOne}>
              <Image
                resizeMode="contain"
                resizeMethod="resize"
                style={styles.img}
                source={require('../../assets/Image_Cat/mix.png')}
              />
            </TouchableOpacity>
            <CategoryList
              onPress={item => {
                Linking.openURL(item.link ? item.link : '');
              }}
              data={utils.Categoreis.slice(14, 16)}
            />
          </View>
        </ScrollView>
        <View style={{bottom: 0, width: '100%', alignItems: 'center'}}>
          <BannerAd
            unitId={utils.addIts.BANNER != undefined ? utils.addIts.BANNER : ''}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;
