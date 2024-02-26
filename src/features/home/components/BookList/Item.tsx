import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Text from 'core/components/Text';
import {Book} from 'features/home/type/book.ts';
import {shadow} from 'core/styles/styles.tsx';
import palette from 'core/styles/palette.ts';
import Button from 'core/components/Button';

type Props = {item: Book; onEdit: () => void; onDelete: () => void};
const {width} = Dimensions.get('window');
const Item = (props: Props) => {
  const {item, onDelete, onEdit} = props;
  return (
    <View style={[styles.bookItem, shadow]}>
      <Text size={'xl'} style={styles.bookTitle} color={'primary'}>
        {item.title}
      </Text>
      <Text color={'textSecondary'}>{item.author}</Text>
      <Text size={'xs'} color={'textSecondary'}>
        Genre : {item.genre}
      </Text>
      <Text size={'xs'} color={'textSecondary'}>
        Year published : {item.yearPublished}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          onPress={onEdit}
          size={'l'}
          color={'white'}
          iconRight={'pencil'}
          title={'Edit'}
        />
        <Button
          style={styles.button}
          onPress={onDelete}
          size={'l'}
          color={'white'}
          iconRight={'delete'}
          backgroundColor={'error'}
          title={'Delete'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bookItem: {
    backgroundColor: palette.white,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.border,
    marginBottom: 16,
    marginHorizontal: 12,
  },
  bookTitle: {
    marginBottom: 16,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  button: {
    flex: 1,
  },
});
export default Item;
