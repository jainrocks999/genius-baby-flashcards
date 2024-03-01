import React from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
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
  const dispatch = useDispatch();
  const settting = useSelector((state: rootState) => state.data.setting_data);
  const getCatDetails = async (item: (typeof utils.Categoreis)[0]) => {
    const cat_details = await utils.db('tbl_items', item.cate_name, false, 0);
    dispatch({
      type: 'helper/get_data_by_category',
      payload: cat_details,
      navigation,
    });
    navigation.navigate('Detail_Screen');
  };
  const handleOnMamory = async () => {
    let length =
      settting.GameLevel == '1' ? 3 : settting.GameLevel == '2' ? 4 : 6;
    const data = await utils.getMemory(length);
    dispatch({
      type: 'helper/get_memory_data_from_db',
      payload: data,
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
                handleOnMamory();
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
              onPress={item => console.log(item)}
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
