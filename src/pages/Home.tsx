import { useEffect, useRef, useState } from 'react';
import { Book, books as booksArray } from '../temp_data.ts';
import BookGallery from '../components/BookGallery.tsx';
import BookDetails from '../components/BookDetails.tsx';
import ReadingStats from '../components/ReadingStats.tsx';
import { getFullBookId } from '../utils';
import AddBookForm from '../components/AddBookForm.tsx';

const Home = () => {
  const [books, setBooks] = useState<Book[]>(booksArray);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isAddingBook, setIsAddingBook] = useState<boolean>(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedBook) {
      const bookIndex = books.findIndex((book) => book.id === selectedBook.id);
      const targetIndex = Math.max(1, bookIndex - 1);
      const targetBook = document.getElementById(
        getFullBookId(books[targetIndex]?.id)
      );

      if (targetBook && galleryRef.current) {
        targetBook.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }
  }, [selectedBook, books]);

  const handleBackToStats = () => {
    setSelectedBook(null);
    setIsAddingBook(false);
    if (galleryRef.current) {
      galleryRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = 500;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleAddBook = (newBook: Book) => {
    setBooks([newBook, ...booksArray]);
    setIsAddingBook(false);
  };

  return (
    <div
      className={`container-fluid vh-100 d-flex flex-column overflow-hidden`}
      style={{ background: 'rgb(0,0,0) linear-gradient(216deg, rgba(0,0,0,1) 0%, rgba(37,37,37,1) 17%, rgba(70,70,70,1) 50%, rgba(105,104,104,1) 74%, rgba(0,0,0,1) 100%)' }}
    >
      <h1 className={`text-center`}>BookStation</h1>

      <BookGallery
        books={books}
        selectedBook={selectedBook}
        onSelect={setSelectedBook}
        galleryRef={galleryRef}
        setIsAddingBook={setIsAddingBook}
        isAddingBook={isAddingBook}
        scrollGallery={scrollGallery}
      />

      <div className={`mt-auto p-3`}>
        {isAddingBook ? (
          <AddBookForm handleAddBook={handleAddBook} />
        ) : selectedBook ? (
          <BookDetails book={selectedBook} onBack={handleBackToStats} />
        ) : (
          <ReadingStats />
        )}
      </div>
    </div>
  );
};
export default Home;
