import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {BookID, deleteBook} from 'features/home/api/home.ts';
import queryClient from 'core/config/reactQuery.ts';
import {Book} from 'features/home/type/book.ts';

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
    },
  });
}
