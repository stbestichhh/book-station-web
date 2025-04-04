export type BookStatus =
  | 'Reading'
  | 'Want to read'
  | 'Completed'
  | 'Want to buy';

export interface Book {
  id: number;
  title: string;
  author: string;
  pages: number;
  description?: string;
  image?: string;
  status?: BookStatus;
  pagesRead?: number;
  minutesSpent?: number;
  yearFinished?: number;
}
