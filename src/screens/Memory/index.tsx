import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
  BackHandler,
  Platform,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import styles from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {navigationParams} from '../../navigation';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../../redux/store';
import Header from '../../components/Header';
import {cat_type, db_item} from '../../types/Genius/db';
import utils from '../../utils';
import {AddTrack} from 'react-native-track-player';
import {IAPContext} from '../../Context';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {heightPercent as hp} from '../../utils/responsive';
type props = StackScreenProps<navigationParams, 'Memory_Screen'>;

const Memory: React.FC<props> = ({navigation}) => {
  const IAP = useContext(IAPContext);
  const catName = useSelector((state: rootState) => state.data.cate_name);
  const dispatch = useDispatch();
  const data = useSelector((state: rootState) => state.data.memory_data);
  const [selected, setSelected] = useState<db_item>();
  const [selectedeIndex, setSelectedIndex] = useState<number[]>([]);
  const [righIndex, setRinghtIndex] = useState<number[]>([]);
  const [cloud, setCloud] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [count, setCount] = useState(1);
  const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  const settting = useSelector((state: rootState) => state.data.setting_data);

  const handleOnData = async () => {
    let length =
      settting.GameLevel == '1' ? 3 : settting.GameLevel == '2' ? 4 : 6;
    const newdata = await utils.getMemory(
      length,
      catName != 'allInOne' ? catName : null,
    );
    dispatch({
      type: 'helper/get_memory_data_from_db',
      payload: newdata,
    });
  };
  const praisedItem = async (
    item: db_item,
    index: number,
    prevArray: number[],
  ) => {
    setIsDisabled(true);

    const music = {
      url: `${utils.path}${item.Sound}`,
      title: item.Title,
      artist: 'eFlashApps',
      artwork: `${utils.path}${item.Sound}`,
      duration: 0,
    };
    const clapping = {
      url: `${utils.path}clap.mp3`,
      title: item.Title,
      artist: 'eFlashApps',
      artwork: `${utils.path}clap.mp3`,
      duration: 0,
    };

    setSelectedIndex([index]);
    setSelected(item);

    if (cloud.length < 2) {
      setCloud([...cloud, index]);
    }

    if (count === 15) {
      if (!IAP?.hasPurchased) {
        utils.showAdd();
      }
      setCount(0);
    }

    if (selected?._ID === item._ID) {
      if (!IAP?.hasPurchased) {
        setCount(prev => prev + 1);
      }

      if ([...righIndex, index, ...prevArray].length >= data.length) {
        await utils.player(clapping);
        await delay(2000);
        await handleOnData();
        setRinghtIndex([]);
        setSelectedIndex([]);
        setCloud([]);
      } else {
        const voice = (await utils.getRandomVoice()) as any;
        await utils.player(voice);
        await delay(2000);
        setCloud([]);
        setRinghtIndex([...righIndex, index, ...prevArray]);
        setSelected({} as db_item);
        setSelectedIndex([]);
      }
    } else {
      await utils.player(music);

      if ([...cloud, index].length >= 2) {
        await delay(700);
        setCloud([]);
        setSelected({} as db_item);
        setCount(prev => prev + 1);
      }
    }

    setIsDisabled(false);
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
        style={{flex: 1}}
        resizeMode="stretch"
        source={require('../../assets/Image_Bg/screen.png')}>
        <Header
          hasPurchased={true}
          onUpgrade={() => {
            null;
          }}
          ishome
          isMemory
          isSetting={false}
          title=""
        />
        <View
          style={[
            styles.secondContainer,
            { 
              height: IAP?.hasPurchased
                ? hp(Platform.OS == 'android' ? 91 : 80)
                : hp(Platform.OS == 'android' ? 82.4 : 73),
              paddingBottom:
                Platform.OS == 'android'
                  ? IAP?.hasPurchased
                    ? '8%'
                    : '0%'
                  : '4%',
            },
          ]}>
          <View style={styles.mainContainer}>
            {data.length < 12 ? (
              <FlatList
                key={'_'}
                data={data}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      praisedItem(item, index, selectedeIndex);
                    }}
                    disabled={
                      selectedeIndex.includes(index) ||
                      righIndex.includes(index) ||
                      isDisabled
                    }
                    style={[
                      data.length == 6
                        ? {
                            ...styles.listContainer,
                            height: hp(
                              Platform.OS == 'android'
                                ? 23
                                : IAP?.hasPurchased
                                ? '23'
                                : '19',
                            ),
                          }
                        : data.length == 8
                        ? {
                            ...styles.listContainer2,
                            height: hp(Platform.OS == 'android' ? 18 : '15'),
                          }
                        : null,
                    ]}>
                    {!righIndex.includes(index) ? (
                      <>
                        <Image
                          style={{height: '100%', width: '100%'}}
                          resizeMode="stretch"
                          source={{uri: `${utils.path}${item.Image}`}}
                        />

                        {!cloud.includes(index) ? (
                          <Image
                            style={{
                              height: '100%',
                              width: '100%',
                              position: 'absolute',
                              zIndex: 1,
                            }}
                            resizeMode="stretch"
                            source={require('../../assets/Image_Bg/review.png')}
                          />
                        ) : null}
                      </>
                    ) : null}
                  </TouchableOpacity>
                )}
              />
            ) : (
              <FlatList
                key={'#'}
                data={data}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      praisedItem(item, index, selectedeIndex);
                    }}
                    disabled={
                      selectedeIndex.includes(index) ||
                      righIndex.includes(index) ||
                      isDisabled
                    }
                    style={[styles.listContainer3]}>
                    {!righIndex.includes(index) ? (
                      <>
                        <Image
                          style={{height: '100%', width: '100%'}}
                          resizeMode="stretch"
                          source={{uri: `${utils.path}${item.Image}`}}
                        />

                        {!cloud.includes(index) ? (
                          <Image
                            style={{
                              height: '100%',
                              width: '100%',
                              position: 'absolute',
                              zIndex: 1,
                            }}
                            resizeMode="stretch"
                            source={require('../../assets/Image_Bg/review.png')}
                          />
                        ) : null}
                      </>
                    ) : null}
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
        {!IAP?.hasPurchased && (
          <View style={styles.addContainer}>
            <BannerAd
              unitId={utils.addIts.BANNER || ''}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Memory;
