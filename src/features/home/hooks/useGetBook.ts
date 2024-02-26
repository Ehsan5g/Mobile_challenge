import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {getBooks} from 'features/home/api/home.ts';
import {Book} from 'features/home/type/book.ts';

interface GetBookProps {
  id?: string;
}

export function useGetBook({id}: GetBookProps): UseQueryResult<Book[], Error> {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => getBooks(id ? {id: id} : undefined),
  });
}
