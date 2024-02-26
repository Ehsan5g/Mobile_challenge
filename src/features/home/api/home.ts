import {deleteApi, get, path, post} from 'core/helpers/axios';
import {Book} from 'features/home/type/book.ts';

export interface BookID {
  id: string;
}

export interface AddBook {
  title: string;
  author: string;
  genre: string;
  yearPublished: number;
}

export interface UpdateBook extends AddBook, BookID {
  checkedOut: boolean;
}

export async function getBooks(body?: BookID): Promise<Book[]> {
  return get<Book[]>(`books${body ? `/${body.id}` : ''}`).then(res => res.data);
}

export async function addBook(body: AddBook): Promise<any> {
  return post<any>(`books`, body).then(res => res.data);
}

export async function deleteBook(body: BookID): Promise<any> {
  return deleteApi<any>(`books/${body.id}`).then(res => res.data);
}

export async function updateBook(body: UpdateBook): Promise<any> {
  return path<any>(`books/${body.id}`, {
    title: body.title,
    author: body.author,
    yearPublished: body.yearPublished,
    genre: body.genre,
    checkedOut: body.checkedOut,
  }).then(res => res.data);
}
