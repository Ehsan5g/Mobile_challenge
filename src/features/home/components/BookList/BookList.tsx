import React, {useCallback} from 'react';
import {FlatList, FlatListProps} from 'react-native';
import Item from 'features/home/components/BookList/Item';
import {Book} from 'features/home/type/book.ts';

type Props = Omit<FlatListProps<Book>, 'renderItem'> & {
  onDelete: (book: Book) => void;
  onEdit: (book: Book) => void;
  onPress: (bookId: string) => void;
};

const BookList = (props: Props) => {
  const {data, onEdit, onDelete, onPress, ...res} = props;

  const renderItem = useCallback(
    ({item}: {item: Book}) => (
      <Item
        onDelete={() => {
          onDelete(item);
        }}
        onEdit={() => {
          onEdit(item);
        }}
        item={item}
        onPress={() => {
          onPress(item.id);
        }}
      />
    ),
    [onDelete],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      {...res}
    />
  );
};

export default BookList;
