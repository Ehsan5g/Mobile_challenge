import React, {useCallback, useState} from 'react';

import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  AppNavigatorParam,
  TypeCreateBook,
} from 'app/navigation/AppNavigation.tsx';
import {AppRoutes} from 'app/navigation/routes.ts';
import palette from 'core/styles/palette.ts';
import Text from 'core/components/Text';
import {Book as BookType} from 'features/home/type/book.ts';
import {useDeleteBook} from 'features/home/hooks/useDeleteBook.ts';
import {useGetBookDetail} from 'features/home/hooks/useGetBookDetail.ts';
import Button from 'core/components/Button';
import MessageModal from 'core/components/MessageModal';
import Header from 'core/components/Header';
import moment from 'moment';

const Book = () => {
  const {params} = useRoute<RouteProp<AppNavigatorParam, AppRoutes.BOOK>>();
  const {navigate, goBack} =
    useNavigation<NavigationProp<AppNavigatorParam, AppRoutes.BOOK>>();

  const [message, setMessage] = useState<BookType | undefined>(undefined);

  const {data, isPending} = useGetBookDetail(params.bookId);
  const {mutateAsync: deleteBook, isPending: deleteLoading} = useDeleteBook();

  const onDelete = useCallback(() => {
    setMessage(data);
  }, []);

  console.log(data, params.bookId);

  if (isPending) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={palette.primary} />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={'Book'}
        onBack={() => {
          goBack();
        }}
      />
      <View style={styles.book}>
        <Text size={'xl'} style={styles.bookTitle} color={'primary'}>
          {data?.title}
        </Text>
        <Text style={styles.text}>Author : {data?.author}</Text>
        <Text style={styles.text}>Genre : {data?.genre}</Text>

        <Text style={styles.text}>Year published : {data?.yearPublished}</Text>
        <Text style={styles.text}>
          Creat At : {moment(data?.createdAt).format('YYYY/MM/DD')}
        </Text>
        <View style={styles.gap} />
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={() => {
              navigate(AppRoutes.CREATE_BOOK, {
                type: TypeCreateBook.EDITE,
                book: data,
              });
            }}
            size={'l'}
            color={'white'}
            iconRight={'pencil'}
            title={'Edit'}
          />
          <Button
            style={styles.button}
            onPress={() => {
              onDelete();
            }}
            size={'l'}
            color={'white'}
            iconRight={'delete'}
            backgroundColor={'error'}
            title={'Delete'}
          />
        </View>
      </View>
      <MessageModal
        visible={message != undefined}
        onCancel={() => setMessage(undefined)}
        onConfirm={async () => {
          if (message != undefined) {
            setMessage(undefined);
            await deleteBook({id: message.id});
            goBack();
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.border,
  },

  book: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 12,
    flex: 1,
  },
  bookTitle: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  text: {
    marginBottom: 8,
  },
  button: {
    flex: 1,
  },
  gap: {
    flex: 1,
  },
});
export default Book;
