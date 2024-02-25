import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {getBooks} from 'features/home/api/home.ts';

interface GetBookProps {
  id?: string;
}

export function useGetBook({id}: GetBookProps): UseQueryResult<any, Error> {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => getBooks(id ? {id: id} : undefined),
  });
}
