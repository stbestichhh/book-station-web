import { useEffect, useRef, useState } from 'react';
import { Book, books as booksArray } from '../temp_data.ts';
import BookGallery from '../components/BookGallery.tsx';
import BookDetails from '../components/BookDetails.tsx';
import ReadingStats from '../components/ReadingStats.tsx';
import { getFullBookId } from '../utils';
import AddBookForm from '../components/AddBookForm.tsx';
import { motion } from 'framer-motion';

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

  const handleDeleteBook = (book: Book) => {
    books.splice(books.indexOf(book), 1);
    setBooks([...books]);
  };

  return (
    <div
      className={`d-flex flex-column overflow-hidden`}
      style={{
        background:
          'rgb(0,0,0) linear-gradient(216deg, rgba(0,0,0,1) 0%, rgba(37,37,37,1) 17%, rgba(70,70,70,1) 50%, rgba(105,104,104,1) 74%, rgba(0,0,0,1) 100%)',
        minHeight: '100vh',
      }}
    >
      <h1 className={`mt-3 text-center text-light`}>BookStation</h1>

      <motion.div
        initial={{ opacity: 0, z: 10 }}
        animate={{ opacity: 1, z: 0 }}
        exit={{ opacity: 0, z: -10 }}
        transition={{ duration: 1 }}
        style={{
          minHeight: '420px',
          overflow: 'hidden',
        }}
      >
        <BookGallery
          books={books}
          selectedBook={selectedBook}
          onSelect={setSelectedBook}
          galleryRef={galleryRef}
          setIsAddingBook={setIsAddingBook}
          isAddingBook={isAddingBook}
          scrollGallery={scrollGallery}
        />
      </motion.div>

      <div
        className={`flex-grow-1 px-4 d-flex justify-content-start align-items-start`}
        style={{ marginTop: '20px' }}
      >
        <div className="col-md-3"></div>
        <div className="col-md-6">
          {isAddingBook ? (
            <AddBookForm handleAddBook={handleAddBook} />
          ) : selectedBook ? (
            <BookDetails
              book={selectedBook}
              onBack={handleBackToStats}
              handleDeleteBook={handleDeleteBook}
            />
          ) : (
            <ReadingStats />
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
