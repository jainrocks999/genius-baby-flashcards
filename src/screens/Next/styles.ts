import {StyleSheet} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2596be',
  },
  bg_container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    marginTop: hp(8),
  },
  image: {
    height: '100%',
    width: '100%',
  },
  btn: {
    height: hp(7.5),
    width: hp(7.5),
  },
  addContainer: {
    height: hp(8.5),
    backgroundColor: '#0099d5',
    alignItems: 'center',
  },
  upgrade: {
    height: hp(6),
    width: wp(50),
    marginTop: '-10%',
  },
});
