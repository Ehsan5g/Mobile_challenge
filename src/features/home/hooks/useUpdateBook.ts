import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {UpdateBook, updateBook} from 'features/home/api/home.ts';
import {AxiosError} from 'axios';
import queryClient from 'core/config/reactQuery.ts';

export function useUpdateBook(): UseMutationResult<
  any,
  Error,
  UpdateBook,
  unknown
> {
  return useMutation({
    mutationKey: ['updateBook'],
    mutationFn: (body: UpdateBook) => updateBook(body),
    onSuccess: async () => {
      await queryClient.refetchQueries({queryKey: ['book']});
    },
    onError: (e: AxiosError) => {},
  });
}
