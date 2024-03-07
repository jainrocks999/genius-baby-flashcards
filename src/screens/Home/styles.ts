import {StyleSheet} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2596be',
  },
  containerStyle: {
    paddingBottom: hp(0.5),
  },
  mainBackground: {
    height: '100%',
    width: '100%',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  allIntOne: {
    height: hp(30),
    width: wp(85),
  },
});
