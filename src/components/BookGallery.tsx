import { Book } from '../temp_data.ts';
import * as React from 'react';
import AddBookCard from './AddBookCard.tsx';
import ReadingStatsCard from './ReadingStatsCard.tsx';
import BookCard from './BookCard.tsx';
import ArrowButton from './ArrowButton.tsx';
import { useEffect, useState } from 'react';

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
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Book[]>([]);
  const [searchIsFocused, setSearchIsFocused] = useState(false);

  const getBookImage = (book: Book) => {
    let bookImage = book.image || 'book.svg';

    if (!book.image && book.status) {
      const statusMap: Record<string, string> = {
        Reading: 'book_started.svg',
        Completed: 'book_finished.svg',
      };

      bookImage = statusMap[status] || 'book.svg';
    }
    return bookImage;
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResult([]);
    } else {
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResult(filteredBooks);
    }
  }, [searchTerm, books]);

  const handleSelectSearchResult = (book: Book) => {
    onSelect(book);
    setSearchTerm('');
    setSearchResult([]);
  };

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
      <div
        className="d-flex w-100"
        style={{
          padding: '0px 15px 0px 30px',
          marginTop: '20px',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          className={'d-flex position-relative'}
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'start',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              paddingLeft: '10px',
            }}
          >
            <img src="search.svg" style={{ width: '40px', height: '40px' }} />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchIsFocused(true)}
            onBlur={() => setTimeout(() => setSearchIsFocused(false), 150)}
            className={'form-control w-50'}
            style={{
              borderRadius: '20px',
              padding: '10px 15px 10px 50px',
              backgroundColor: 'rgba(39, 43, 51, 0.2)',
              color: 'white',
              borderColor: 'transparent',
            }}
          />
          {searchIsFocused && searchResult.length > 0 && (
            <div
              className={'position-absolute'}
              style={{
                top: '120%',
                width: '50%',
                maxHeight: '200px',
                overflowY: 'auto',
                touchAction: 'pan-x',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                zIndex: 1000,
                borderRadius: '10px',
              }}
            >
              {searchResult.map((book) => (
                <div
                  key={book.id}
                  onClick={() => handleSelectSearchResult(book)}
                  style={{
                    padding: '10px 15px',
                    cursor: 'pointer',
                    color: 'white',
                    display: 'flex',
                    transition:
                      'background-color 0.7s ease, transform 0.2s ease',
                    backgroundColor: 'rgba(67, 68, 69, 0.9)',
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background =
                      'rgba(67, 68, 69, 0.99)')
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = 'rgba(67, 68, 69, 0.9)')
                  }
                >
                  <img
                    src={getBookImage(book)}
                    style={{
                      height: '50px',
                      width: '40px',
                      borderRadius: '10px',
                      marginRight: '10px',
                      borderColor: 'black',
                    }}
                  />
                  <div>
                    {book.title}
                    <br />
                    <span style={{ fontWeight: 'lighter', fontSize: '15px' }}>
                      {book.author}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className={'d-flex gap-2'}
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'right',
            whiteSpace: 'nowrap',
          }}
        >
          <ArrowButton
            onClick={() => scrollGallery('left')}
            arrowDirection="90"
          />
          <ArrowButton
            onClick={() => scrollGallery('right')}
            arrowDirection="-90"
          />
        </div>
      </div>
      <div
        ref={galleryRef}
        className={`d-flex p-3`}
        style={{
          whiteSpace: 'nowrap',
          position: 'static',
          top: 0,
          width: '100vw',
          overflowX: 'auto',
          touchAction: 'pan-x',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
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
            image={getBookImage(book)}
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
