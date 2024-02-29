import {StyleSheet} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';
export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '75%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  txt: {
    fontSize: wp(8),
    fontFamily: 'OpenSans_Condensed-Medium',
    color: 'white',
    textAlign: 'right',
  },
  txtContainer: {
    width: '30%',
  },
  cicleContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '3%',
  },
  circle: {
    borderWidth: wp(0.7),
    height: hp(3),
    width: hp(3),
    borderRadius: hp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt2: {
    fontSize: wp(4),
    fontFamily: 'OpenSans_Condensed-Medium',
    color: 'black',
    textAlign: 'right',
  },
  circle2: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(3),
  },
  innerCercle: {
    height: '70%',
    width: '70%',
    backgroundColor: 'green',
    borderRadius: hp(1),
  },
});
