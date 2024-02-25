import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {AddBook, addBook} from 'features/home/api/home.ts';

export function useAddBook(): UseMutationResult<any, Error, AddBook, unknown> {
  return useMutation({
    mutationKey: ['addBook'],
    mutationFn: (body: AddBook) => addBook(body),
  });
}
