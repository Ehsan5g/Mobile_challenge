import Text from 'core/components/Text';
import React from 'react';
import Icon from 'core/components/Icon';
import {StyleSheet, View} from 'react-native';
import palette from 'core/styles/palette.ts';
import pallet from 'core/styles/palette.ts';

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARN = 'shadow',
}

type Prop = {
  title: string | undefined;
  description: string | undefined;
  type?: ToastType;
};

const Toast = (prop: Prop): JSX.Element => {
  const {title, type, description} = prop;
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: type
            ? type == ToastType.SUCCESS
              ? pallet.success
              : type == ToastType.ERROR
              ? pallet.error
              : type == ToastType.WARN
              ? palette.warning
              : palette.success
            : palette.success,
        },
      ]}>
      <View style={styles.item}>
        <Icon
          name={
            type === ToastType.SUCCESS
              ? 'check-circle'
              : type === ToastType.ERROR
              ? 'alert-circle'
              : 'alert'
          }
          size={24}
          color={palette.white}
        />
        <View style={styles.textContainer}>
          <Text size={'s'} color={'white'}>
            {title ?? ''}
          </Text>
          <Text color={'white'} size={'xs'}>
            {description ?? ''}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  textContainer: {
    flex: 1,
  },
});

export default Toast;
