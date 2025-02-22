import { useEffect, useRef, useState } from 'react';
import { Book, books as booksArray } from '../temd_data.ts';
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
  }, [selectedBook]);

  const handleBackToStats = () => {
    setSelectedBook(null);
    setIsAddingBook(false);
    if (galleryRef.current) {
      galleryRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const handleAddBook = (newBook: Book) => {
    setBooks([newBook, ...booksArray]);
    setIsAddingBook(false);
  };

  return (
    <div className={`container mt-4`}>
      <h1 className={`text-center`}>Book Library</h1>

      <BookGallery
        books={books}
        selectedBook={selectedBook}
        onSelect={setSelectedBook}
        galleryRef={galleryRef}
        setIsAddingBook={setIsAddingBook}
        isAddingBook={isAddingBook}
      />

      <div className={`mt-4 p-3 border border-secondary`}>
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
