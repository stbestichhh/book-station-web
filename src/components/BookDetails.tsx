import { Book } from '../temp_data.ts';

interface BookDetailsProps {
  book: Book;
  onBack: () => void;
}

const BookDetails = ({ book, onBack }: BookDetailsProps) => {
  return (
    <div>
      <h2>{book.title}</h2>
      <img src={book.image} className={`img-fluid mb-3`} alt={book.title} />
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Pages:</strong> {book.pagesRead}/{book.pages} (
        {((book.pagesRead / book.pages) * 100).toFixed(1)}%)
      </p>
      <p>
        <strong>Minutes spent:</strong> {book.minutesSpent}
      </p>
      <p>
        <strong>Status:</strong> {book.status}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>
      <button className={`btn btn-secondary`} onClick={onBack}>
        Back to main page
      </button>
    </div>
  );
};
export default BookDetails;
