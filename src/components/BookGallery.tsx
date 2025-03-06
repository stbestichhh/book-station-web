import { Book } from '../temp_data.ts';
import * as React from 'react';
import AddBookCard from './AddBookCard.tsx';
import ReadingStatsCard from './ReadingStatsCard.tsx';
import BookCard from './BookCard.tsx';
import ArrowButton from './ArrowButton.tsx';

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
    <div className="position-relative w-100" style={{ minHeight: '320px' }}>
      <div className="d-flex gap-2 justify-content-end w-100" style={{ paddingRight: '15px' }}>
        <ArrowButton
          onClick={() => scrollGallery('left')}
          arrowDirection="90"
        />
        <ArrowButton
          onClick={() => scrollGallery('right')}
          arrowDirection="-90"
        />
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
            status={book.status}
            onSelect={() => onBookCardSelect(book)}
            isSelected={selectedBook?.id === book.id}
          />
        ))}
      </div>
    </div>
  );
};
export default BookGallery;
