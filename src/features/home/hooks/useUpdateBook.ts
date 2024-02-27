import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {UpdateBook, updateBook} from 'features/home/api/home.ts';
import {AxiosError} from 'axios';
import queryClient from 'core/config/reactQuery.ts';
import Toast from 'react-native-toast-message';

export function useUpdateBook(): UseMutationResult<
  any,
  Error,
  UpdateBook,
  unknown
> {
  return useMutation({
    mutationKey: ['updateBook'],
    mutationFn: (body: UpdateBook) => updateBook(body),
    onSuccess: async (res, book) => {
      await queryClient.refetchQueries({queryKey: ['book']});
      await queryClient.refetchQueries({queryKey: ['bookDetail', book.id]});
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Book successfully updated!',
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
