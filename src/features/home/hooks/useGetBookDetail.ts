import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {getBook} from 'features/home/api/home.ts';
import {Book} from 'features/home/type/book.ts';

export function useGetBookDetail(bookId: string): UseQueryResult<Book, Error> {
  return useQuery({
    queryKey: ['bookDetail', bookId],
    queryFn: () => getBook(bookId),
  });
}
