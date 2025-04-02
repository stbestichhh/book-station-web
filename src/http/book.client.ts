import { AbstractApiClient } from './abstractApiClient.ts';
import { Book } from '../book.type.ts';

class BookClient extends AbstractApiClient<Book> {
  public fetchBooks(bookId?: number): Promise<Book | Book[]> {
    return this.get(bookId ? `books/${bookId}` : '/books');
  }

  public createBook(data: Book) {
    return this.post('/books', data);
  }

  public editBook(bookId: number, data: Partial<Book>) {
    return this.patch(`/books/${bookId}`, data);
  }

  public deleteBook(bookId: number) {
    return this.delete(`/books/${bookId}`);
  }
}

export const bookHttp = new BookClient(import.meta.env.VITE_SERVER_BASE_URL);
