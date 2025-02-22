import { useEffect, useRef, useState } from 'react';
import { Book, books } from '../temd_data.ts';
import BookGallery from '../components/BookGallery.tsx';
import BookDetails from '../components/BookDetails.tsx';
import ReadingStats from '../components/ReadingStats.tsx';
import { getFullBookId } from '../utils';

const Home = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
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
    if (galleryRef.current) {
      galleryRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`container mt-4`}>
      <h1 className={`text-center`}>Book Library</h1>

      <BookGallery
        books={books}
        selectedBook={selectedBook}
        onSelect={setSelectedBook}
        galleryRef={galleryRef}
      />

      <div className={`mt-4 p-3 border border-secondary`}>
        {selectedBook ? (
          <BookDetails book={selectedBook} onBack={handleBackToStats} />
        ) : (
          <ReadingStats />
        )}
      </div>
    </div>
  );
};
export default Home;
