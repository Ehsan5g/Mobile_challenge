import React, {useCallback} from 'react';
import {FlatList, FlatListProps} from 'react-native';
import Item from 'features/home/components/BookList/Item';
import {Book} from 'features/home/type/book.ts';

type Props = Omit<FlatListProps<Book>, 'renderItem'> & {
  onDelete: (book: Book) => void;
};

const BookList = (props: Props) => {
  const {data, onDelete, ...res} = props;

  const renderItem = useCallback(
    ({item}: {item: Book}) => (
      <Item
        onDelete={() => {
          onDelete(item);
        }}
        onEdit={() => {}}
        item={item}
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
