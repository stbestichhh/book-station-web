import { books } from '../temp_data.ts';

const ReadingStats = () => {
  console.log(books.filter((book) => book.status === 'Completed' && book.year_finished === new Date().getFullYear()).length);

  return (
    <>
      <div>
        <h2 style={{
          color: 'white'
        }}>Welcome</h2>
        <div
          className={`card d-inline-block`}
          style={{
            width: '300px',
            height: '300px',
            cursor: 'pointer',
            flex: '0 0 auto',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            borderRadius: '30px',
            backgroundColor: 'rgb(38, 43, 52)',
          }}
        ></div>
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
          <strong>Yearly reading goal:</strong> {books.filter((book) => book.status === 'Completed' && book.year_finished === new Date().getFullYear()).length}/5 books
        </p>
        <p>
          <strong>Daily reading goal:</strong> 15 minutes
        </p>
      </div>
    </>
  );
};
export default ReadingStats;
