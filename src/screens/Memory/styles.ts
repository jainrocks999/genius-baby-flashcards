import {StyleSheet} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    height: hp(24),
    width: wp(44),
    marginHorizontal: wp(2),
    marginVertical: hp(1),
  },
  mainContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(4),
  },
  listContainer2: {
    height: hp(17),
    width: wp(42),
    marginHorizontal: wp(2),
    marginVertical: hp(1),
  },
  listContainer3: {
    height: hp(16),
    width: wp(30),
    marginHorizontal: wp(1),
    marginVertical: hp(1),
  },
});
