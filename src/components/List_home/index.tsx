import React from 'react';
import {FlatList} from 'react-native';
import utils from '../../utils';
import Card from '../Card';
type props = {
  data: typeof utils.Categoreis;
};
const CategoryList: React.FC<props> = ({data}) => {
  const databyCategory = async (item: (typeof utils.Categoreis)[0]) => {
    const data = await utils.db('tbl_items', item.cate_name, false, 0);
    console.log(data);
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
            databyCategory(item);
          }}
          item={item}
        />
      )}
    />
  );
};

export default CategoryList;
