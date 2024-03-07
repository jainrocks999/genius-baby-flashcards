import {StyleSheet} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2596be',
  },
  settingContainer: {
    marginTop: '30%',
    alignItems: 'center',
    marginRight: '4%',
  },
  container2: {
    flex: 1,
  },
  addContainer: {
    height: hp(10),
    backgroundColor: '#0099d5',
    alignItems: 'center',
  },
  btnContainer: {
    width: '85%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: hp(3),
  },
  img: {
    height: '100%',
    width: '100%',
  },
  btn: {
    height: hp(5.5),
    width: wp(35),
  },
});
