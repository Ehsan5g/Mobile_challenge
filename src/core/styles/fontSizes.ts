import {RFValue} from 'react-native-responsive-fontsize';

const standardScreenHeight = 580;

const fontSizes = {
  t: RFValue(8),
  xs: RFValue(10),
  s: RFValue(12),
  r: RFValue(14),
  xr: RFValue(16),
  l: RFValue(18),
  xl: RFValue(22.5),
  xxl: RFValue(30),
};

export type FontSize = keyof typeof fontSizes;
export default fontSizes;
