import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {AddBook, addBook} from 'features/home/api/home.ts';
import {AxiosError} from 'axios';
import queryClient from 'core/config/reactQuery.ts';

export function useAddBook(): UseMutationResult<any, Error, AddBook, unknown> {
  return useMutation({
    mutationKey: ['addBook'],
    mutationFn: (body: AddBook) => addBook(body),
    onSuccess: async () => {
      await queryClient.refetchQueries({queryKey: ['book']});
    },
    onError: (e: AxiosError) => {},
  });
}
