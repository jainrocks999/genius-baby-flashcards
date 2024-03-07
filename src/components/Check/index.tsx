import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';
type props = {
  title: string;
  onPress: (val: boolean) => void;
  value: boolean;
};
const Check: React.FC<props> = ({title, onPress, value}) => {
  return (
    <View style={styles.container}>
      <View style={styles.txtContainer}>
        <Text style={styles.txt}>{title}</Text>
      </View>
      <TouchableOpacity
        onPress={() => onPress(!value)}
        style={styles.iconContainer}>
        <Image
          style={styles.img}
          source={
            value
              ? require('../../assets/Image_icons/on.png')
              : require('../../assets/Image_icons/off.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default Check;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: hp(7),
    width: hp(7),
    marginRight: wp(3),
  },
  img: {
    height: '100%',
    width: '100%',
  },
  txt: {
    fontSize: wp(7),
    fontFamily: 'OpenSans_Condensed-Medium',
    color: 'white',
    textAlign: 'right',
  },
  txtContainer: {
    width: '70%',
  },
});
