import React, {useCallback, useMemo, useState} from 'react';

import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import palette from 'core/styles/palette.ts';
import pallet from 'core/styles/palette.ts';
import {useGetBook} from 'features/home/hooks/useGetBook.ts';
import Text from 'core/components/Text';
import BookList from 'features/home/components/BookList';
import Icon from 'core/components/Icon';
import Input from 'core/components/Input';
import {Book} from 'features/home/type/book.ts';
import MessageModal from 'core/components/MessageModal';
import {useDeleteBook} from 'features/home/hooks/useDeleteBook.ts';
import Button from 'core/components/Button';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  AppNavigatorParam,
  TypeCreateBook,
} from 'app/navigation/AppNavigation.tsx';
import {AppRoutes} from 'app/navigation/routes.ts';

const Home = () => {
  const {navigate} =
    useNavigation<NavigationProp<AppNavigatorParam, AppRoutes.Home>>();

  const [message, setMessage] = useState<Book | undefined>(undefined);
  const [search, setSearch] = useState('');

  const {data, isPending: getLoading, refetch, isRefetching} = useGetBook();
  const {mutateAsync: deleteBook, isPending: deleteLoading} = useDeleteBook();

  const filteredData = useMemo(() => {
    return search.length > 0
      ? data?.filter(
          item =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.author.toLowerCase().includes(search.toLowerCase()) ||
            item.genre.toLowerCase().includes(search.toLowerCase()) ||
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
      <View>
        <View style={styles.header}>
          <Text size={'xxl'}>Books</Text>
          <Button
            style={styles.button}
            onPress={() => {
              navigate(AppRoutes.CREATE_BOOK, {
                type: TypeCreateBook.ADD,
                book: undefined,
              });
            }}
            title={'Add new Book'}
            iconRight={'plus'}
            color={'white'}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name={'magnify'} size={24} color={palette.border} />
          <Input
            style={styles.input}
            placeholder={'Search'}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>
      <BookList
        refreshControl={
          <RefreshControl
            colors={[palette.primary, pallet.secondary]}
            refreshing={isRefetching}
            onRefresh={() => refetch()}
          />
        }
        onPress={bookId => {
          navigate(AppRoutes.BOOK, {bookId});
        }}
        onDelete={onDelete}
        onEdit={book => {
          navigate(AppRoutes.CREATE_BOOK, {
            type: TypeCreateBook.EDITE,
            book: book,
          });
        }}
        data={filteredData}
        showsVerticalScrollIndicator={false}
      />
      <MessageModal
        visible={message != undefined}
        onCancel={() => setMessage(undefined)}
        onConfirm={async () => {
          if (message != undefined) {
            setMessage(undefined);
            await deleteBook({id: message.id});
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.border,
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
  button: {
    paddingHorizontal: 12,
  },
});

export default Home;
