import React, {FunctionComponent} from 'react';
import {
  StyleSheet,
  Text as RNText,
  TextProps as NativeTextProps,
} from 'react-native';
import fontSizes, {FontSize} from 'core/styles/fontSizes.ts';
import palette, {Color} from 'core/styles/palette.ts';

const TextAline = {
  right: 'right',
  left: 'left',
  center: 'center',
};

export type TextProps = NativeTextProps & {
  size?: FontSize;
  textAline?: keyof typeof TextAline;
  color?: Color;
};

const Text: FunctionComponent<TextProps> = prop => {
  const {children, textAline, color, size, style, ...rest} = prop;

  return (
    <RNText
      style={[
        {
          fontSize: size ? fontSizes[size] : fontSizes.r,
          color: color ? palette[color] : palette.text,
          ...(textAline
            ? {
                textAlign:
                  textAline && textAline == TextAline.left
                    ? 'left'
                    : textAline && textAline == TextAline.right
                    ? 'right'
                    : 'center',
              }
            : {}),
        },
        style,
      ]}
      {...rest}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {},
});
export default Text;
