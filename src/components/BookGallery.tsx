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
  scrollGallery: (direction: 'left' | 'right') => void;
}

const BookGallery = ({
  books,
  selectedBook,
  onSelect,
  galleryRef,
  setIsAddingBook,
  isAddingBook,
  scrollGallery,
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
    <div className="position-relative w-100">
      <div className="d-flex gap-2 justify-content-end w-100">
        <button
          className="btn btn-secondary rounded-circle"
          style={{ width: '50px', height: '50px' }}
          onClick={() => scrollGallery('left')}
        >
          ←
        </button>
        <button
          className="btn btn-secondary rounded-circle"
          style={{ width: '50px', height: '50px' }}
          onClick={() => scrollGallery('right')}
        >
          →
        </button>
      </div>
      <div
        ref={galleryRef}
        className={`d-flex p-3 overflow-hidden`}
        style={{
          whiteSpace: 'nowrap',
          position: 'static',
          top: 0,
          width: '100vw',
        }}
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
    </div>
  );
};
export default BookGallery;
