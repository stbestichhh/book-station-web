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
  setIsAddingBook: (state: boolean) => void;
  isAddingBook: boolean;
}

const BookGallery = ({
  books,
  selectedBook,
  onSelect,
  galleryRef,
  setIsAddingBook,
  isAddingBook,
}: BookGalleryProps) => {
  const onBookAddSelect = () => {
    setIsAddingBook(true);
    onSelect(null);
  };

  const onBookCardSelect = (book: Book) => {
    setIsAddingBook(false);
    onSelect(book);
  };

  return (
    <div
      ref={galleryRef}
      className={`d-flex overflow-auto p-3 border border-secondary`}
      style={{ whiteSpace: 'nowrap', maxWidth: '100%' }}
    >
      <AddBookCard
        onSelect={onBookAddSelect}
        isAddingBook={isAddingBook}
        selectedBook={selectedBook}
      />
      <ReadingStatsCard
        onSelect={onSelect}
        selectedBook={selectedBook}
        setIsAddingBook={setIsAddingBook}
        isAddingBook={isAddingBook}
      />
      {books.map((book) => (
        <BookCard
          key={book.id}
          bookId={book.id}
          title={book.title}
          image={book.image}
          onSelect={() => onBookCardSelect(book)}
          isSelected={selectedBook?.id === book.id}
        />
      ))}
    </div>
  );
};
export default BookGallery;
