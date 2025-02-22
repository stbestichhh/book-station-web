import { Book } from '../temd_data.ts';
import * as React from 'react';
import AddBookCard from './AddBookCard.tsx';
import ReadingStatsCard from './ReadingStatsCard.tsx';
import BookCard from './BookCard.tsx';

interface BookGalleryProps {
  books: Book[];
  selectedBook: Book | null;
  onSelect: (book: Book | null) => void;
  galleryRef: React.RefObject<HTMLDivElement | null>;
}

const BookGallery = ({
  books,
  selectedBook,
  onSelect,
  galleryRef,
}: BookGalleryProps) => {
  return (
    <div
      ref={galleryRef}
      className={`d-flex overflow-auto p-3 border border-secondary`}
      style={{ whiteSpace: 'nowrap', maxWidth: '100%' }}
    >
      <AddBookCard />
      <ReadingStatsCard onSelect={onSelect} selectedBook={selectedBook} />
      {books.map((book) => (
        <BookCard
          key={book.id}
          bookId={book.id}
          title={book.title}
          image={book.image}
          onSelect={() => onSelect(book)}
          isSelected={selectedBook?.id === book.id}
        />
      ))}
    </div>
  );
};
export default BookGallery;
