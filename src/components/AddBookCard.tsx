import { books } from '../temd_data.ts';
import GalleryCard from './GalleryCard.tsx';

const AddBookCard = () => {
  const addBook = () => {
    books.unshift({
      id: books[books.length - 1].id + 1,
      title: 'Book Three',
      author: 'Author C',
      pages: 400,
      description: 'Yet another great book.',
      image: 'https://placehold.co/600x400/000000/FFFFFF/png',
      pagesRead: 0,
      minutesSpent: 0,
      status: 'Reading',
    });
  };

  return <GalleryCard title={`Add new book`} onSelect={addBook} />;
};
export default AddBookCard;
