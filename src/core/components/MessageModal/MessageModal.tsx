import React, {FunctionComponent} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {convertHexToRGBA} from '../../helpers/color';
import Icon from '../Icon';
import Text from '../Text';
import Button from '../Button';
import palette, {Color} from 'core/styles/palette.ts';

type Props = {
  visible: boolean;
  icon?: string;
  description: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmTitle?: string;
  cancelTitle?: string;
  loading?: boolean;
  cancelType?: Color;
  confirmType?: Color;
  iconColor?: Color;
  titleColor?: Color;
  title?: string;
};

const MessageModal: FunctionComponent<Props> = props => {
  const {
    visible,
    icon,
    description,
    onCancel,
    onConfirm,
    loading,
    confirmTitle,
    cancelTitle,
    cancelType,
    confirmType,
    title,
    iconColor,
    titleColor,
  } = props;

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={() => {
        onCancel?.();
      }}>
      <View
        style={[
          styles.backgroundContainer,
          {backgroundColor: convertHexToRGBA('#000000', 50)},
        ]}>
        <View
          style={[
            styles.card,
            {
              alignItems: title ? 'flex-start' : 'center',
            },
          ]}>
          <View style={styles.flexDirectionRow}>
            <Icon
              name={icon ?? 'alert-circle-outline'}
              size={title ? 30 : 50}
              color={iconColor ? palette[iconColor] : palette.error}
            />
            <Text color={titleColor} style={styles.marginH16} numberOfLines={1}>
              {title}
            </Text>
          </View>
          <Text
            style={[
              styles.descriptionText,
              title == undefined && {textAlign: 'center'},
            ]}>
            {description}
          </Text>
          <View style={styles.flexDirectionRow}>
            <Button
              onPress={() => {
                onConfirm?.();
              }}
              size={'l'}
              loading={loading}
              title={confirmTitle ?? 'Yes'}
              style={styles.button}
              color={'white'}
              backgroundColor={confirmType ?? 'primary'}
            />
            {onCancel && (
              <>
                <View style={styles.w16} />
                <Button
                  onPress={() => {
                    onCancel?.();
                  }}
                  color={cancelType ? cancelType : 'error'}
                  size={'l'}
                  title={cancelTitle ?? 'Cancel'}
                  transparent={true}
                  borderColor={cancelType ? cancelType : 'error'}
                  style={styles.button}
                />
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: palette.white,
  },
  flexDirectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginH16: {
    marginHorizontal: 16,
  },
  descriptionText: {
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  button: {
    flex: 1,
  },
  w16: {
    width: 16,
  },
});

export default MessageModal;
