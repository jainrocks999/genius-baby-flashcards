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
type props = StackScreenProps<navigationParams, 'Setting_Screen'>;
const Setting: React.FC<props> = ({navigation}) => {
  const dispatch = useDispatch();
  const setting_db = useSelector((state: rootState) => state.data.setting_data);
  const [values, setValues] = useState({
    Voice: false,
    RandomOrder: false,
    Swipe: false,
    Game: false,
    GameLevel: 'easy',
  });
  useEffect(() => {
    setSettingfromDb();
  }, [setting_db]);

  const setSettingfromDb = () => {
    console.log('called');

    let Voice = setting_db.Voice == '1' ? true : false;
    let RandomOrder = setting_db.RandomOrder == '1' ? true : false;
    let Swipe = setting_db.Swipe == '1' ? true : false;
    let Game = setting_db.Game == '1' ? true : false;
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
  const handleOnSave = () => {
    let tempSetting = {} as seeting_db;
    Object.keys(values).map(item => {
      let key = item as keyof typeof values;
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
    let payload = {
      setting_data: tempSetting,
      navigation,
    };

    console.log(tempSetting);

    dispatch({
      type: 'helper/update_setting_to_tb',
      payload,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.container2}
        resizeMode="stretch"
        source={require('../../assets/Image_Bg/bg.png')}>
        <Header isMemory={false} ishome title="" isSetting />
        <View style={styles.settingContainer}>
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
          <TouchableOpacity style={styles.btn}>
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
