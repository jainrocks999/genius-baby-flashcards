import React from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  View,
  ScrollView,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {navigationParams} from '../../navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import Header from '../../components/Header';
import CategoryList from '../../components/List_home';
import utils from '../../utils';
type Props = StackScreenProps<navigationParams, 'Home_Screen'>;
const Home: React.FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#2596be'} />
      <ImageBackground
        resizeMethod="scale"
        resizeMode="stretch"
        style={styles.mainBackground}
        source={require('../../assets/Image_Bg/screen.png')}>
        <Header />
        <ScrollView contentContainerStyle={styles.containerStyle}>
          <View
            style={{width: '100%', alignSelf: 'center', alignItems: 'center'}}>
            <CategoryList data={utils.Categoreis.slice(0, 14)} />
            <View style={styles.allIntOne}>
              <Image
                resizeMode="contain"
                resizeMethod="resize"
                style={styles.img}
                source={require('../../assets/Image_Cat/mix.png')}
              />
            </View>
            <CategoryList data={utils.Categoreis.slice(14, 16)} />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;
