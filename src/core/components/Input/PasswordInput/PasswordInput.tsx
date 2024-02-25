import React, {useState} from 'react';
import Input, {InputProps} from 'core/components/Input/index';
import Icon from 'core/components/Icon';
import Text from 'core/components/Text';
import UnStyledButton from 'core/components/UnStyledButton';
import {I18nManager, StyleSheet, View} from 'react-native';
import palette from 'core/styles/palette.ts';

type Props = InputProps;

const PasswordInput = (props: Props): JSX.Element => {
  const {borderColor, errorSize, error, ...res} = props;
  const [passwordVisible, setPasswordVisible] = useState(true);

  return (
    <>
      <View
        style={[
          styles.container,
          {
            flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
            borderColor: borderColor
              ? palette[borderColor]
              : error
              ? palette.error
              : palette.border,
            backgroundColor: palette.backgroundColor,
          },
        ]}>
        <Input
          style={styles.input}
          secureTextEntry={passwordVisible}
          error={error}
          showError={false}
          {...res}
        />
        <UnStyledButton
          style={styles.iconContainer}
          onPress={() => setPasswordVisible(per => !per)}>
          <Icon
            name={passwordVisible ? 'eye' : 'eye-off'}
            color={error ? palette.error : palette.thirdText}
            size={20}
          />
        </UnStyledButton>
      </View>

      <Text color={'error'} size={errorSize ?? 's'}>
        {error ?? ''}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 12,
  },
  input: {
    flex: 1,
    borderWidth: 0,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});
export default PasswordInput;
