import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import Text from 'core/components/Text';
import palette, {Color} from 'core/styles/palette.ts';
import fontSizes, {FontSize} from 'core/styles/fontSizes.ts';
import {convertHexToRGBA} from 'core/helpers/color.ts';

export type InputProps = TextInputProps & {
  error?: string;
  borderColor?: Color;
  color?: Color;
  size?: FontSize;
  errorSize?: FontSize;
  showError?: boolean;
};

const Input = (props: InputProps): JSX.Element => {
  const {
    color,
    error,
    placeholder,
    errorSize,
    size,
    borderColor,
    style,
    showError = true,
    ...rest
  } = props;

  return (
    <>
      <TextInput
        placeholderTextColor={
          error ? convertHexToRGBA(palette.error, 40) : palette.border
        }
        style={[
          styles.input,
          {
            backgroundColor: 'transparent',
            fontSize: size ? fontSizes[size] : fontSizes.r,
            borderColor: borderColor
              ? palette[borderColor]
              : error
              ? palette.error
              : palette.border,

            color: color
              ? palette[color]
              : error
              ? palette.error
              : palette.text,
            textAlign: 'left',
            direction: 'ltr',
          },
          style,
        ]}
        underlineColorAndroid={'transparent'}
        placeholder={placeholder}
        textAlign={'right'}
        {...rest}
      />
      {showError && (
        <Text color={'error'} size={errorSize ?? 's'}>
          {error ?? ''}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
  },
});

export default Input;
