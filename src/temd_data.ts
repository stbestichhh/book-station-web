export interface Book {
  id: number;
  title: string;
  author: string;
  pages: number;
  description: string;
  image: string;
  status: 'Reading' | 'Want to read' | 'Want to buy' | 'Completed' | '';
  pagesRead: number;
  minutesSpent: number;
}

export const books: Book[] = [
  {
    id: 1,
    title: 'Book One',
    author: 'Author A',
    pages: 320,
    description: 'A great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: 'Completed',
  },
  {
    id: 2,
    title: 'Book Two',
    author: 'Author B',
    pages: 250,
    description: 'Another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: 'Reading',
  },
  {
    id: 3,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: 'Completed',
  },
  {
    id: 4,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: 'Want to buy',
  },
  {
    id: 5,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: 'Want to read',
  },
  {
    id: 6,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: '',
  },
  {
    id: 7,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: '',
  },
  {
    id: 8,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: '',
  },
  {
    id: 9,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: '',
  },
  {
    id: 10,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: '',
  },
  {
    id: 11,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: '',
  },
  {
    id: 12,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: '',
  },
  {
    id: 13,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: '',
  },
  {
    id: 14,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: '',
  },
  {
    id: 15,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: '',
  },
  {
    id: 16,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: '',
  },
  {
    id: 17,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: '',
  },
  {
    id: 18,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: '',
  },
  {
    id: 19,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: '',
  },
  {
    id: 20,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
    pagesRead: 0,
    minutesSpent: 0,
    status: 'Reading',
  },
];
