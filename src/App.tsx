import { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Book {
  id: number;
  title: string;
  author: string;
  pages: number;
  description: string;
  image: string;
}

const books: Book[] = [
  {
    id: 0,
    title: 'Stats',
    author: 'Author A',
    pages: 320,
    description: 'A great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 1,
    title: 'Book One',
    author: 'Author A',
    pages: 320,
    description: 'A great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 2,
    title: 'Book Two',
    author: 'Author B',
    pages: 250,
    description: 'Another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 3,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 4,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 5,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 6,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 7,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 8,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 9,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 10,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 11,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 12,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 13,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 14,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 15,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 16,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 17,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 18,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 19,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
  {
    id: 20,
    title: 'Book Three',
    author: 'Author C',
    pages: 400,
    description: 'Yet another great book.',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png',
  },
];

export default function App() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(() => {
    const savedBook = localStorage.getItem('selectedBook');
    return savedBook ? JSON.parse(savedBook) : books[0];
  });
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('selectedBook', JSON.stringify(selectedBook));
    if (selectedBook && selectedBook.id !== 0) {
      const bookIndex = books.findIndex((book) => book.id === selectedBook.id);
      const targetIndex = Math.max(1, bookIndex - 1); // Scrolls to second or third book
      const targetBook = document.getElementById(
        `book-${books[targetIndex].id}`
      );
      if (targetBook && galleryRef.current) {
        targetBook.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }
  }, [selectedBook]);

  return (
    <div className="container mt-4">
      <h1 className="text-center">Book Library</h1>

      {/* Horizontal Book Gallery */}
      <div
        ref={galleryRef}
        className="d-flex overflow-auto p-3 border border-secondary"
        style={{ whiteSpace: 'nowrap', maxWidth: '100%' }}
      >
        {books.map((book) => (
          <div
            key={book.id}
            id={`book-${book.id}`}
            className={`card m-2 d-inline-block ${selectedBook?.id === book.id ? 'border-primary' : ''}`}
            style={{
              width: selectedBook?.id === book.id ? '180px' : '150px',
              cursor: 'pointer',
              flex: '0 0 auto',
              transition: 'all 0.3s ease',
            }}
            onClick={() => setSelectedBook(book)}
          >
            <img src={book.image} className="card-img-top" alt={book.title} />
            <div className="card-body text-center">
              <h6 className="card-title">{book.title}</h6>
            </div>
          </div>
        ))}
      </div>

      {/* Stats or Book Details Section */}
      <div className="mt-4 p-3 border border-secondary">
        {selectedBook && selectedBook.id !== 0 ? (
          <div>
            <h2>{selectedBook.title}</h2>
            <img
              src={selectedBook.image}
              className="img-fluid mb-3"
              alt={selectedBook.title}
            />
            <p>
              <strong>Author:</strong> {selectedBook.author}
            </p>
            <p>
              <strong>Pages:</strong> {selectedBook.pages}
            </p>
            <p>
              <strong>Description:</strong> {selectedBook.description}
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => setSelectedBook(books[0])}
            >
              Back to Stats
            </button>
          </div>
        ) : (
          <div>
            <h2>Reading Stats</h2>
            <p>
              <strong>Pages Read:</strong> 1500
            </p>
            <p>
              <strong>Minutes Spent Reading:</strong> 1200
            </p>
            <p>
              <strong>Books Completed:</strong> 5
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
