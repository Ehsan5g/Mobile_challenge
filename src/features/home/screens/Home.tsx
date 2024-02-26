import React, {useCallback, useMemo, useState} from 'react';

import {ActivityIndicator, StyleSheet, View} from 'react-native';
import palette from 'core/styles/palette.ts';
import {useGetBook} from 'features/home/hooks/useGetBook.ts';
import Text from 'core/components/Text';
import BookList from 'features/home/components/BookList';
import Icon from 'core/components/Icon';
import Input from 'core/components/Input';
import {Book} from 'features/home/type/book.ts';
import MessageModal from 'core/components/MessageModal';
import {useDeleteBook} from 'features/home/hooks/useDeleteBook.ts';

const Home = () => {
  const [message, setMessage] = useState<Book | undefined>(undefined);
  const {data, isPending: getLoading} = useGetBook({id: undefined});

  const [search, setSearch] = useState('');

  const {mutateAsync: deleteBook, isPending: deleteLoading} = useDeleteBook();

  const filteredData = useMemo(() => {
    return search.length > 0
      ? data?.filter(
          item =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.author.toLowerCase().includes(search.toString()) ||
            item.genre.toLowerCase().includes(search.toString()) ||
            item.yearPublished.toString().includes(search),
        )
      : data;
  }, [data, search]);

  const onDelete = useCallback((book: Book) => {
    setMessage(book);
  }, []);

  if (getLoading || deleteLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={palette.primary} />
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name={'magnify'} size={24} color={palette.border} />
        <Input
          style={styles.input}
          placeholder={'Search'}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <BookList
        onDelete={onDelete}
        data={filteredData}
        showsVerticalScrollIndicator={false}
      />
      <MessageModal
        visible={message != undefined}
        onCancel={() => setMessage(undefined)}
        onConfirm={async () => {
          if (message != undefined) {
            await deleteBook({id: message.id});
            setMessage(undefined);
          }
        }}
        title={'Delete the book'}
        description={`Are you sure to delete the ${message} book?`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundColor,
    paddingTop: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    borderRadius: 12,
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 16,
    backgroundColor: palette.white,
    borderColor: palette.border,
    borderWidth: 1,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 0,
  },
});

export default Home;
