import React from 'react';
import {StyleSheet, View} from 'react-native';
import palette from 'core/styles/palette.ts';
import UnStyledButton from 'core/components/UnStyledButton';
import Text from 'core/components/Text';
import Icon from 'core/components/Icon';
import {shadow} from 'core/styles/styles.tsx';

type Props = {
  onBack?: () => void;
  title?: string;
};

const Header = (props: Props) => {
  const {onBack, title} = props;
  return (
    <View style={styles.header}>
      <UnStyledButton
        onPress={() => {
          onBack?.();
        }}
        disabled={onBack == undefined}
        style={styles.headerIconContainer}>
        <Icon name={'chevron-left'} size={24} />
        <Text>Back</Text>
      </UnStyledButton>
      <Text style={styles.title} size={'xl'}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: palette.backgroundColor,
    borderBottomWidth: 1,
    paddingVertical: 12,
    borderBottomColor: palette.border,
    paddingHorizontal: 8,
    ...shadow,
  },
  headerIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
});
export default Header;
