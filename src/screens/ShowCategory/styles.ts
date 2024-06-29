import {StyleSheet} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a4a6a5',
  },
  cat_image: {
    height: hp(63),
    width: wp(100),
    // marginTop: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2),

    borderColor: 'red',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  btnContainer: {
    height: hp(10),
    width: '100%',
    backgroundColor: 'rgba(69, 71, 71,.5)',
    flexDirection: 'row',
    paddingHorizontal: hp(2),
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 0,
  },
  btn: {
    height: '80%',
    width: wp(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {height: '100%', width: '100%'},
  imageContainer: {
    height: hp(72),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
