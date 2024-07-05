import {Dimensions, PixelRatio} from 'react-native';
const {height, width} = Dimensions.get('window');
const heightPercent = (percent: number | string) => {
  const elemWidth = typeof percent === 'number' ? percent : parseFloat(percent);
  return PixelRatio.roundToNearestPixel((height * elemWidth) / 100);
};
const widthPrecent = (percent: number | string) => {
  const elemWidth = typeof percent === 'number' ? percent : parseFloat(percent);

  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};
export {widthPrecent, heightPercent};
