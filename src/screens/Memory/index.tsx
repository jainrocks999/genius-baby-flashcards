import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {navigationParams} from '../../navigation';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../../redux/store';
import Header from '../../components/Header';
import {cat_type, db_item} from '../../types/Genius/db';
import utils from '../../utils';
type props = StackScreenProps<navigationParams, 'Memory_Screen'>;

const Memory: React.FC<props> = () => {
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
    const newdata = await utils.getMemory(length);
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
      url: `asset:/files/${item.Sound}`,
      title: item.Title,
      artist: 'eFlashApps',
      artwork: `asset:/files/${item.Sound}`,
      duration: 0,
    };

    setSelectedIndex([index]);
    setSelected(item);
    if (cloud.length < 2) {
      setCloud([...cloud, index]);
    }
    if (selected?._ID == item._ID) {
      setCount(prev => prev + 1);
      if ([...righIndex, index, ...prevArray].length >= data.length) {
        utils.player(music);
        await delay(2000);
        await handleOnData();
        setIsDisabled(false);
        setRinghtIndex([]);
        setSelectedIndex([]);
        setCloud([]);
      } else {
        await utils.player(music);
        await delay(500);
        setCloud([]);
        setRinghtIndex([...righIndex, index, ...prevArray]);
        setSelected({} as db_item);
        setSelectedIndex([]);
      }
    } else {
      await utils.player(music);
      if ([...cloud, index].length >= 2) {
        await delay(500);
        setCloud([]);
        setSelected({} as db_item);
        setCount(prev => prev + 1);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{flex: 1}}
        resizeMode="stretch"
        source={require('../../assets/Image_Bg/screen.png')}>
        <Header ishome isMemory isSetting={false} title="" />
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
                    selectedeIndex.includes(index) || righIndex.includes(index)
                  }
                  style={[
                    data.length == 6
                      ? styles.listContainer
                      : data.length == 8
                      ? styles.listContainer2
                      : null,
                  ]}>
                  {!righIndex.includes(index) ? (
                    <>
                      <Image
                        style={{height: '100%', width: '100%'}}
                        resizeMode="stretch"
                        source={{uri: `${utils.path}${item.Image}.jpg`}}
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
                    selectedeIndex.includes(index) || righIndex.includes(index)
                  }
                  style={[styles.listContainer3]}>
                  {!righIndex.includes(index) ? (
                    <>
                      <Image
                        style={{height: '100%', width: '100%'}}
                        resizeMode="stretch"
                        source={{uri: `${utils.path}${item.Image}.jpg`}}
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
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Memory;
