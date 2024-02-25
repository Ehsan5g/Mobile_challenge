import {deleteApi, get, path, post} from 'core/helpers/axios';

interface BookID {
  id: string;
}

interface AddBook {
  title: string;
  author: string;
  genre: string;
  yearPublished: number;
}

interface UpdateBook extends AddBook, BookID {}

export async function getBooks(body?: BookID): Promise<any> {
  return get<any>(`books${body ? `/${body.id}` : ''}`).then(res => res.data);
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
  }).then(res => res.data);
}
