import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';
import utils from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {navigationParams} from '../../navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../../redux/store';

type props = {
  ishome: boolean;
  title: string;
  isSetting: boolean;
  isMemory: boolean;
};
const Header: React.FC<props> = ({ishome, title, isSetting, isMemory}) => {
  const navigation = useNavigation<StackNavigationProp<navigationParams>>();
  const sound = useSelector((state: rootState) => state.data.default_sound);
  const track = {
    url: `${utils.path}baby_flash_theme.mp3`,
    title: 'eFalsh sound',
    artist: 'eFlashApps',
    album: 'eFlashApps',
    genre: 'welcome to geniues baby flash cards',
    date: new Date().toDateString(),
    artwork: `${utils.path}baby_flash_theme.mp3`,
    duration: 4,
  };
  const dispatch = useDispatch();
  const playSound = async () => {
    sound && ishome && !isMemory
      ? await utils.player(track)
      : await utils.resetPlayer();
  };
  useEffect(() => {
    playSound();
  }, [sound, ishome]);
  const handleOnPress = () => {
    ishome && !isMemory
      ? dispatch({
          type: 'helper/baby_flash_them',
          payload: !sound,
        })
      : navigation.reset({index: 0, routes: [{name: 'Home_Screen'}]});
  };
  return (
    <View
      style={[
        styles.container,
        !ishome ? {backgroundColor: '#a4a6a5', elevation: 5} : undefined,
      ]}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            handleOnPress();
          }}
          style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={
              ishome && !isMemory
                ? sound
                  ? require('../../assets/Image_icons/speakar57.png')
                  : require('../../assets/Image_icons/speakar58.png')
                : require('../../assets/Image_icons/home_btn.png')
            }
          />
        </TouchableOpacity>
        {!ishome ? <Text style={styles.txt}>{title ? title : ''}</Text> : null}
        <TouchableOpacity
          disabled={isSetting}
          onPress={() => {
            navigation.navigate('Setting_Screen');
          }}
          style={styles.iconContainer}>
          {!isSetting ? (
            <Image
              style={styles.icon}
              source={require('../../assets/Image_icons/setting_icn.png')}
            />
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: hp(9),
    width: '100%',
  },
  row: {
    width: '95%',
    alignSelf: 'center',
    height: '85%',
    marginTop: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    height: '100%',
    width: '100%',
  },
  iconContainer: {
    height: hp(6),
    width: hp(6),
  },
  txt: {
    fontSize: wp(7),
    color: 'white',
    fontFamily: 'OpenSans-SemiBold',
  },
});
