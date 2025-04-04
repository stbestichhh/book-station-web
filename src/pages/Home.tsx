import { useCallback, useEffect, useRef, useState } from 'react';
import { Book } from '../book.type.ts';
import BookGallery from '../components/BookGallery.tsx';
import BookDetails from '../components/BookDetails.tsx';
import ReadingStats from '../components/ReadingStats.tsx';
import { getFullBookId } from '../utils';
import AddBookForm from '../components/AddBookForm.tsx';
import { motion } from 'framer-motion';
import { bookHttp } from '../http';
import axios from 'axios';
import { User } from '../user.type.ts';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isAddingBook, setIsAddingBook] = useState<boolean>(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      const user = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/user/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setCurrentUser(user.data as User);
      return user;
    } catch (e) {
      console.log(e);
      navigate('/auth');
    }
  };

  const fetchBooks = useCallback(async () => {
    console.log('fetchBooks()');
    try {
      const booksData = await bookHttp.fetchBooks();

      setBooks((prevBooks) => {
        if (JSON.stringify(prevBooks) !== JSON.stringify(booksData)) {
          return booksData as Book[];
        }
        return prevBooks;
      });
    } catch (error) {
      setBooks([]);
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchBooks().then();
    getCurrentUser().then();
    if (selectedBook) {
      const bookIndex = books.findIndex((book) => book.id === selectedBook.id);
      const targetIndex = Math.max(1, bookIndex - 1);
      const targetBook = document.getElementById(
        getFullBookId(books[targetIndex]?.id)
      );

      if (targetBook && galleryRef.current && window.innerWidth > 768) {
        targetBook.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }
  }, [selectedBook, fetchBooks]);

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

  const handleAddBook = async (newBook: Book) => {
    await bookHttp.createBook(newBook).then(() => fetchBooks());
    setIsAddingBook(false);
  };

  const handleDeleteBook = async (book: Book) => {
    await bookHttp.deleteBook(book.id).then(() => fetchBooks());
    handleBackToStats();
  };

  const handleEditBook = async (
    book: Book,
    bookProps: Partial<Exclude<Book, 'id'>>
  ) => {
    await bookHttp.editBook(book.id, bookProps).then(() => fetchBooks());
    handleBackToStats();
  };

  return (
    <div
      className={`d-flex flex-column overflow-hidden`}
      style={{
        background:
          'rgb(0,0,0) linear-gradient(216deg, rgba(0,0,0,1) 0%, rgba(37,37,37,1) 17%, rgba(70,70,70,1) 50%, rgba(105,104,104,1) 74%, rgba(0,0,0,1) 100%)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
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
          fetchUser={getCurrentUser}
        />
      </motion.div>

      <div
        className={`flex-grow-1 px-4 d-flex justify-content-start align-items-start`}
        style={{ marginTop: '30px' }}
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
              handleEditBook={handleEditBook}
            />
          ) : (
            <ReadingStats books={books} user={currentUser!} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
