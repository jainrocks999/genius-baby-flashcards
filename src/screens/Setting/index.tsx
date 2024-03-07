import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  ImageBackground,
  Vibration,
  View,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import {navigationParams} from '../../navigation';
import styles from './styles';
import Header from '../../components/Header';
import Check from '../../components/Check';
import Radio from '../../components/Radio';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../../redux/store';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import utils from '../../utils';
import {seeting_db} from '../../types/Genius/db';
import TrackPlayer from 'react-native-track-player';
import {isTablet} from 'react-native-device-info';
type props = StackScreenProps<navigationParams, 'Setting_Screen'>;
const Setting: React.FC<props> = ({navigation}) => {
  const catName = useSelector((state: rootState) => state.data.cate_name);
  const screens = useSelector((state: rootState) => state.data.screens);
  const dispatch = useDispatch();
  const setting_db = useSelector((state: rootState) => state.data.setting_data);
  const [values, setValues] = useState({
    Voice: false,
    RandomOrder: false,
    Swipe: false,
    Game: false,
    GameLevel: 'easy',
  });
  const tablate = isTablet();

  useEffect(() => {
    setSettingfromDb();
  }, [setting_db]);

  const setSettingfromDb = () => {
    let Voice = setting_db.Voice == '1';
    let RandomOrder = setting_db.RandomOrder == '1';
    let Swipe = setting_db.Swipe == '1';
    let Game = setting_db.Game == '1';
    let GameLevel =
      setting_db.GameLevel == '1'
        ? 'easy'
        : setting_db.GameLevel == '2'
        ? 'medium'
        : 'hard';
    setValues(prev => ({
      ...prev,
      Voice,
      RandomOrder,
      Game,
      GameLevel,
      Swipe,
    }));
  };
  const handleonPress = (name: string, val: boolean) => {
    setValues(prev => ({...prev, [name]: val}));
  };
  const handleOnRadioPress = (val: string) => {
    setValues(prev => ({
      ...prev,
      GameLevel: val,
    }));
  };

  const handleOnSave = async () => {
    updateSettings();
    await TrackPlayer.reset();

    const gameLevel =
      values.GameLevel === 'easy'
        ? '1'
        : values.GameLevel === 'medium'
        ? '2'
        : '3';

    if (screens.prev !== 'Home_Screen') {
      if (
        values.Game ||
        (screens.prev === 'Memory_Screen' && catName === 'allInOne')
      ) {
        if (
          setting_db.Game !== '1' ||
          setting_db.GameLevel !== gameLevel ||
          (screens.prev === 'Memory_Screen' && catName === 'allInOne')
        ) {
          handleOnMemory();
        } else {
          navigation.goBack();
        }
      } else {
        const formatObj = {
          Voice: setting_db.Voice === '1',
          RandomOrder: setting_db.RandomOrder === '1',
          Swipe: setting_db.Swipe === '1',
          GameLevel: '1',
          Game: setting_db.Game === '1',
        };

        const shouldNavigateBack =
          values.Game === formatObj.Game &&
          values.RandomOrder === formatObj.RandomOrder;

        if (!shouldNavigateBack) {
          handleOnDetails();
          dispatch({
            type: 'helper/setBackSound',
            payload: false,
          });
        } else {
          navigation.goBack();
          dispatch({
            type: 'helper/setBackSound',
            payload: true,
          });
        }
      }
    } else {
      navigation.reset({index: 0, routes: [{name: 'Home_Screen'}]});
    }
  };

  const updateSettings = () => {
    let tempSetting = {} as seeting_db;
    Object.keys(values).map(item => {
      let key = item as keyof typeof values;
      console.log(values[key]);
      if (typeof values[key] == 'boolean') {
        tempSetting = {...tempSetting, [item]: values[key] ? '1' : '0'};
      } else {
        tempSetting = {
          ...tempSetting,
          [item]:
            values[key] == 'easy' ? '1' : values[key] == 'medium' ? '2' : '3',
        };
      }
    });
    dispatch({
      type: 'helper/update_setting_to_tb',
      payload: {setting_data: tempSetting},
    });
  };
  const handleOnDetails = async () => {
    let cate_data = await utils.db('tbl_items', catName, values.RandomOrder, 0);

    dispatch({
      type: 'helper/get_data_by_category',
      payload: cate_data,
      navigation,
    });
    navigation.replace('Detail_Screen');
  };
  const handleOnMemory = async () => {
    let length =
      values.GameLevel == 'easy' ? 3 : values.GameLevel == 'medium' ? 4 : 6;

    let cate_data = await utils.getMemory(
      length,
      catName == 'allInOne' ? null : catName,
    );

    dispatch({
      type: 'helper/get_memory_data_from_db',
      payload: cate_data,
    });
    navigation.replace('Memory_Screen');
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (screens.prev !== 'Home_Screen') {
          if (screens.prev === 'Detail_Screen') {
            dispatch({
              type: 'helper/setBackSound',
              payload: true,
            });
          }

          navigation.goBack();
        } else {
          navigation.reset({index: 0, routes: [{name: 'Home_Screen'}]});
        }

        return true;
      },
    );
    return () => {
      backHandler.remove();
    };
  }, [navigation, screens.prev, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.container2}
        resizeMode="stretch"
        source={require('../../assets/Image_Bg/bg.png')}>
        <Header isMemory={false} ishome title="" isSetting />
        <View
          style={[
            styles.settingContainer,
            !tablate ? {marginTop: '37%'} : null,
          ]}>
          <Check
            onPress={val => handleonPress('Voice', val)}
            value={values.Voice}
            title="Voice :"
          />
          <Check
            onPress={val => handleonPress('RandomOrder', val)}
            value={values.RandomOrder}
            title="Random Order :"
          />
          <Check
            onPress={val => handleonPress('Swipe', val)}
            value={values.Swipe}
            title="Swipe :"
          />
          <Check
            onPress={val => handleonPress('Game', val)}
            value={values.Game}
            title="Memory Game :"
          />
          <Radio
            onPress={handleOnRadioPress}
            value={values.GameLevel}
            title="Level :"
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => {
              if (screens.prev != 'Home_Screen') {
                if (screens.prev == 'Detail_Screen') {
                  dispatch({
                    type: 'helper/setBackSound',
                    payload: true,
                  });
                }
                navigation.goBack();
              } else {
                navigation.goBack();
              }
            }}
            style={styles.btn}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../../assets/Image_icons/cancle.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleOnSave();
            }}
            style={styles.btn}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../../assets/Image_icons/save.png')}
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

export default Setting;
