import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import UnStyledButton, {
  UnStyledButtonProps,
} from 'core/components/UnStyledButton';
import Text from 'core/components/Text';
import {FontSize} from 'core/styles/fontSizes';
import palette, {Color} from 'core/styles/palette';
import Icon from 'core/components/Icon';

export type ButtonProps = Omit<UnStyledButtonProps, 'borderRadius'> & {
  title?: string;
  loading?: boolean;
  size?: FontSize;
  transparent?: boolean;
  color?: Color;
  iconRight?: string;
  iconLeft?: string;
  backgroundColor?: Color;
  borderColor?: Color;
};

const Button = (prop: ButtonProps): JSX.Element => {
  const {
    title,
    loading,
    color,
    size,
    iconLeft,
    transparent,
    iconRight,
    style,
    backgroundColor,
    borderColor,
    ...rest
  } = prop;
  return (
    <UnStyledButton
      style={[
        styles.button,
        {
          ...(borderColor
            ? {borderColor: palette[borderColor], borderWidth: 1}
            : {}),
          backgroundColor: backgroundColor
            ? palette[backgroundColor]
            : transparent
            ? 'transparent'
            : palette.primary,
        },
        style,
      ]}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={palette.card} size={24} />
      ) : (
        <>
          {iconLeft && (
            <Icon name={iconLeft} size={25} color={color ?? palette.white} />
          )}
          <Text
            style={{
              marginLeft: iconLeft ? 10 : 0,
              marginRight: iconRight ? 10 : 0,
            }}
            size={size ?? 'r'}
            color={color ?? 'card'}>
            {title}
          </Text>
          {iconRight && (
            <Icon name={iconRight} size={25} color={color ?? palette.white} />
          )}
        </>
      )}
    </UnStyledButton>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    minHeight: 50,
    borderRadius: 12,
  },
});
export default Button;
