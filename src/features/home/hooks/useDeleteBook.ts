import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {BookID, deleteBook} from 'features/home/api/home.ts';
import queryClient from 'core/config/reactQuery.ts';
import {Book} from 'features/home/type/book.ts';
import Toast from 'react-native-toast-message';
import {AxiosError} from 'axios';

export function useDeleteBook(): UseMutationResult<
  any,
  Error,
  BookID,
  unknown
> {
  return useMutation({
    mutationKey: ['deleteBook'],
    mutationFn: (body: BookID) => deleteBook(body),
    onSuccess: (res, body) => {
      queryClient.setQueriesData(
        {queryKey: ['book']},
        (oldData: Book[] | undefined): Book[] | undefined =>
          oldData?.filter(book => book.id != body.id),
      );
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Book successfully deleted!',
      });
    },
    onError: (e: AxiosError<{message: string}>) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e?.response?.data?.message ?? 'Something wrong!',
      });
    },
  });
}
