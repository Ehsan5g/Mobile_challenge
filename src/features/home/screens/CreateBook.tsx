import React, {useCallback, useState} from 'react';

import {Animated, StyleSheet, Text, View} from 'react-native';
import palette from 'core/styles/palette.ts';
import Input from 'core/components/Input';
import {AddBookValues, useAddForm} from 'features/home/hooks/useAddForm.ts';
import Button from 'core/components/Button';
import {Formik, isNaN} from 'formik';
import {useAddBook} from 'features/home/hooks/useAddBook.ts';
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
import {useUpdateBook} from 'features/home/hooks/useUpdateBook.ts';
import CheckoutRadio from 'features/home/components/CheckoutRadio';
import ScrollView = Animated.ScrollView;

type Props = {};
const CreateBook = () => {
  const {goBack} =
    useNavigation<NavigationProp<AppNavigatorParam, AppRoutes>>();
  const {params} =
    useRoute<RouteProp<AppNavigatorParam, AppRoutes.CREATE_BOOK>>();

  const [yearError, setYearError] = useState<string | undefined>(undefined);
  const [checkout, setCheckout] = useState(
    params.type == TypeCreateBook.EDITE
      ? (params.book?.checkedOut as boolean)
      : true,
  );

  const {initialValues, validationSchema} = useAddForm(
    params.type == TypeCreateBook.EDITE
      ? {
          yearPublished: params.book?.yearPublished.toString() ?? '',
          title: params.book?.title ?? '',
          author: params.book?.author ?? '',
          genre: params.book?.genre ?? '',
        }
      : undefined,
  );

  const {mutateAsync: addBook, isPending: addLoading} = useAddBook();
  const {mutateAsync: updateBook, isPending: updateLoading} = useUpdateBook();

  const onSubmit = useCallback(
    async (value: AddBookValues) => {
      if (isNaN(Number(value.yearPublished))) {
        setYearError('Please enter the correct year');
        return;
      } else {
        setYearError(undefined);
      }

      if (params.type == TypeCreateBook.ADD) {
        await addBook({
          genre: value.genre,
          author: value.author,
          title: value.title,
          yearPublished: Number(value.yearPublished),
        });
      } else {
        await updateBook({
          genre: value.genre,
          author: value.author,
          title: value.title,
          yearPublished: Number(value.yearPublished),
          id: params.book?.id ?? '',
          checkedOut: checkout,
        });
      }
      goBack();
    },
    [checkout, params],
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
          {({
            values,
            handleSubmit,
            touched,
            handleBlur,
            handleChange,
            errors,
            isValid,
          }) => {
            return (
              <>
                <Text>title :</Text>
                <Input
                  style={styles.input}
                  onChangeText={handleChange('title')}
                  value={values.title}
                  error={
                    touched.title && errors.title ? errors.title : undefined
                  }
                  onBlur={handleBlur('title')}
                  placeholder={'test'}
                />

                <Text>Author :</Text>
                <Input
                  style={styles.input}
                  placeholder={'test'}
                  onChangeText={handleChange('author')}
                  value={values.author}
                  error={
                    touched.author && errors.author ? errors.author : undefined
                  }
                  onBlur={handleBlur('author')}
                />

                <Text>genre :</Text>
                <Input
                  style={styles.input}
                  placeholder={'test'}
                  onChangeText={handleChange('genre')}
                  value={values.genre}
                  error={
                    touched.genre && errors.genre ? errors.genre : undefined
                  }
                  onBlur={handleBlur('genre')}
                />

                <Text>year published :</Text>
                <Input
                  keyboardType={'numeric'}
                  style={styles.input}
                  placeholder={'test'}
                  onChangeText={handleChange('yearPublished')}
                  value={values.yearPublished}
                  error={
                    touched.yearPublished && errors.yearPublished
                      ? errors.yearPublished
                      : touched.yearPublished && yearError
                      ? yearError
                      : undefined
                  }
                  onBlur={handleBlur('yearPublished')}
                />

                {params.type == TypeCreateBook.EDITE && (
                  <>
                    <Text>Checkout :</Text>
                    <CheckoutRadio onChange={setCheckout} value={checkout} />
                  </>
                )}

                <Button
                  disabled={!isValid}
                  loading={addLoading || updateLoading}
                  color={'white'}
                  onPress={() => {
                    handleSubmit();
                  }}
                  title={
                    params.type == TypeCreateBook.ADD ? 'Add Book' : 'Edit Book'
                  }
                  iconRight={
                    params.type == TypeCreateBook.ADD ? 'plus' : 'pencil'
                  }
                />
              </>
            );
          }}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundColor,
    paddingHorizontal: 12,
  },
  input: {
    marginBottom: 4,
  },
});

export default CreateBook;
