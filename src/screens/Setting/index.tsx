import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  ImageBackground,
  Vibration,
  View,
} from 'react-native';
import {navigationParams} from '../../navigation';
import styles from './styles';
import Header from '../../components/Header';
import Check from '../../components/Check';
import Radio from '../../components/Radio';
type props = StackScreenProps<navigationParams, 'Setting_Screen'>;
const Setting: React.FC<props> = () => {
  const [values, setValues] = useState({
    voice: true,
    random: false,
    swipe: true,
    memory: false,
  });
  const handleonPress = (name: string, val: boolean) => {
    setValues(prev => ({...prev, [name]: val}));
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={[styles.container]}
        resizeMode="stretch"
        source={require('../../assets/Image_Bg/bg.png')}>
        <Header ishome title="" isSetting />
        <View style={styles.settingContainer}>
          <Check
            onPress={val => handleonPress('voice', val)}
            value={values.voice}
            title="Voice :"
          />
          <Check
            onPress={val => handleonPress('random', val)}
            value={values.random}
            title="Random Order :"
          />
          <Check
            onPress={val => handleonPress('swipe', val)}
            value={values.swipe}
            title="Swipe :"
          />
          <Check
            onPress={val => handleonPress('memory', val)}
            value={values.memory}
            title="Memory Game :"
          />
          <Radio
            onPress={val => handleonPress('memory', val)}
            value={values.memory}
            title="Level :"
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Setting;
