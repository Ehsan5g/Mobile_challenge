const pallet = {
  primary: '#312c51',
  secondary: '#48426d',
  card: '#F0C38e',
  card3: '#f1aa9b',
  secondary2: '#225490',
  accentColor2: '#7373F4',
  backgroundColor: '#fff',
  text: '#444444',
  textSecondary: '#666666',
  border: '#e1e0e7',
  error: '#E35678',
  warning: '#F2A93B',
  success: '#2A9187',
  card2: '#ededf1',
  white: '#fff',
  shadow: '#000',
  gray: '#EAEAEA',
  gray3: '#e1e0e7',
  gray2: '#A1A1A1',
  gray4: '#F8F9F9',
  thirdText: '#888888',
  textField: '#EAEAEA',
  red: '#BD0000',
};
export type Color = keyof typeof pallet;
export type Palette = typeof pallet;

export default pallet;
