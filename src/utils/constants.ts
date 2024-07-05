import {Platform} from 'react-native';

const productSkus = Platform.select({
  android: ['in_ads_products'],
  ios: ['com.eflashapps.eflash2.proupgrade'],
});
export default {
  productSkus: productSkus,
};
