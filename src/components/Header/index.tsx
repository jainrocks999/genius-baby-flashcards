import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';
import utils from '../../utils';

type props = {};
const Header: React.FC<props> = () => {
  const [sound, setSound] = useState(true);
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
  const playSound = async () => {
    sound ? await utils.player(track) : await utils.resetPlayer();
  };
  useEffect(() => {
    playSound();
  }, [sound]);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => setSound(prev => !prev)}
          style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={
              sound
                ? require('../../assets/Image_icons/speakar57.png')
                : require('../../assets/Image_icons/speakar58.png')
            }
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={require('../../assets/Image_icons/setting_icn.png')}
          />
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
});
