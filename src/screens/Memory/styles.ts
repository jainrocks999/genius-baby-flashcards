import {Platform, StyleSheet} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2596be',
  },
  listContainer: {
    height: hp(Platform.OS == 'android' ? 23 : '21'),
    width: wp(44),
    marginHorizontal: wp(2),
    marginVertical: hp(1),
  },
  mainContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(3),
    alignSelf: 'center',
  },
  listContainer2: {
    height: hp(15),
    width: wp(42),
    marginHorizontal: wp(2),
    marginVertical: hp(1),
  },
  listContainer3: {
    height: hp(15),
    width: wp(30),
    marginHorizontal: wp(1),
    marginVertical: hp(1),
  },
  addContainer: {
    height: hp(7.9),
    backgroundColor: '#0099d5',
    alignItems: 'center',
  },
  secondContainer: {
    // height: hp(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
