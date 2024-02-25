import React from 'react';
import {
  Platform,
  Pressable,
  PressableProps,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import palette from 'core/styles/palette.ts';

export type UnStyledButtonProps = Omit<PressableProps, 'style'> &
  TouchableOpacityProps & {
    style?: StyleProp<ViewStyle>;
  };

const UnStyledButton = (prop: UnStyledButtonProps): JSX.Element => {
  const {style, ...rest} = prop;

  return Platform.OS === 'ios' ? (
    <TouchableOpacity style={style} {...rest} />
  ) : (
    <Pressable
      style={style}
      android_ripple={{color: palette.border, borderless: false}}
      {...rest}
    />
  );
};

export default UnStyledButton;
