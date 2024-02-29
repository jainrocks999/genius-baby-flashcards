import {navigationParams} from '../../navigation';
import utils from '../../utils';
import type {NavigationProp} from '@react-navigation/native';
type rootNaviation = NavigationProp<navigationParams>;

export interface payloadType {
  cate_data: (typeof utils.Categoreis)[0];
  navigation: rootNaviation;
}
