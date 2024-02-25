import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {BookID, deleteBook} from 'features/home/api/home.ts';

export function useDeleteBook(): UseMutationResult<
  any,
  Error,
  BookID,
  unknown
> {
  return useMutation({
    mutationKey: ['deleteBook'],
    mutationFn: (body: BookID) => deleteBook(body),
  });
}
