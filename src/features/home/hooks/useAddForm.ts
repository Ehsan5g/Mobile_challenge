import {useMemo} from 'react';
import * as Yup from 'yup';
import {AddBook} from 'features/home/api/home.ts';

interface UseAddForm {
  validationSchema: Yup.ObjectSchema<AddBookValues, Yup.AnyObject, any, ''>;
  initialValues: AddBookValues;
}

export interface AddBookValues extends Omit<AddBook, 'yearPublished'> {
  yearPublished: string;
}

export function useAddForm(): UseAddForm {
  const validationSchema: Yup.ObjectSchema<AddBookValues> = useMemo(
    () =>
      Yup.object().shape({
        title: Yup.string().min(3).required(),
        author: Yup.string().min(3).required(),
        genre: Yup.string().min(3).required(),
        yearPublished: Yup.string().required(),
      }),
    [],
  );

  const initialValues: AddBookValues = {
    title: '',
    author: '',
    genre: '',
    yearPublished: '',
  };

  return {validationSchema, initialValues};
}
