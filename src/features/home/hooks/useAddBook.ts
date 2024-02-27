import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {AddBook, addBook} from 'features/home/api/home.ts';
import {AxiosError} from 'axios';
import queryClient from 'core/config/reactQuery.ts';
import Toast from 'react-native-toast-message';

export function useAddBook(): UseMutationResult<any, Error, AddBook, unknown> {
  return useMutation({
    mutationKey: ['addBook'],
    mutationFn: (body: AddBook) => addBook(body),
    onSuccess: async () => {
      await queryClient.refetchQueries({queryKey: ['book']});
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Book successfully added!',
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
