import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {UpdateBook, updateBook} from 'features/home/api/home.ts';

export function useUpdateBook(): UseMutationResult<
  any,
  Error,
  UpdateBook,
  unknown
> {
  return useMutation({
    mutationKey: ['updateBook'],
    mutationFn: (body: UpdateBook) => updateBook(body),
  });
}
