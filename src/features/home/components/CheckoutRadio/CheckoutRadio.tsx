import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import palette from 'core/styles/palette.ts';
import UnStyledButton from 'core/components/UnStyledButton';

interface Props {
  onChange: (value: boolean) => void;
  value: boolean;
}

const CheckoutRadio = (props: Props) => {
  const {onChange, value} = props;

  return (
    <>
      <UnStyledButton
        onPress={() => onChange(true)}
        style={styles.radioContainer}>
        <View style={styles.radio}>
          {value && <View style={styles.circel} />}
        </View>
        <Text>On</Text>
      </UnStyledButton>
      <UnStyledButton
        onPress={() => onChange(false)}
        style={styles.radioContainer}>
        <View style={styles.radio}>
          {!value && <View style={styles.circel} />}
        </View>
        <Text>Off</Text>
      </UnStyledButton>
    </>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginVertical: 8,
  },
  radio: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circel: {
    width: 16,
    height: 16,
    borderRadius: 19,
    backgroundColor: palette.primary,
  },
});

export default CheckoutRadio;
