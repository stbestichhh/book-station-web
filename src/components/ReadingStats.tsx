import { books } from '../temd_data.ts';

const ReadingStats = () => {
  return (
    <div>
      <h2>Reading Statistics</h2>
      <p>
        <strong>Pages read:</strong>{' '}
        {books.reduce((acc, book) => acc + book.pagesRead, 0)}
      </p>
      <p>
        <strong>Minutes spent reading:</strong>{' '}
        {books.reduce((acc, book) => acc + book.minutesSpent, 0)}
      </p>
      <p>
        <strong>Books completed:</strong>{' '}
        {books.filter((book) => book.status === 'Completed').length}
      </p>
      <p>
        <strong>Yearly reading goal:</strong> 5 books
      </p>
      <p>
        <strong>Daily reading goal:</strong> 15 minutes
      </p>
    </div>
  );
};
export default ReadingStats;
