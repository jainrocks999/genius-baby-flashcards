import React from 'react';
import {FlatList} from 'react-native';
import utils from '../../utils';
import Card from '../Card';
type props = {
  data: typeof utils.Categoreis;
  onPress: (item: (typeof utils.Categoreis)[0]) => void;
};
const CategoryList: React.FC<props> = ({data, onPress}) => {
  const databyCategory = async (item: (typeof utils.Categoreis)[0]) => {
    const data = await utils.db('tbl_items', item.cate_name, false, 0);
  };
  return (
    <FlatList
      scrollEnabled={false}
      data={data}
      numColumns={2}
      keyExtractor={item => item._id.toString()}
      renderItem={({item, index}) => (
        <Card
          onPress={() => {
            onPress(item);
          }}
          item={item}
        />
      )}
    />
  );
};

export default CategoryList;
