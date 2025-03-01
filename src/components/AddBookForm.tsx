import { useState } from 'react';
import { Book } from '../temp_data.ts';

const AddBookForm = ({
  handleAddBook,
}: {
  handleAddBook: (book: Book) => void;
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddBook({
      id: Date.now(),
      title,
      author,
      pages: Number(pages),
      description: '',
      image: image || 'https://placehold.co/600x400/000000/FFFFFF/png',
      status: 'Reading',
      pagesRead: 0,
      minutesSpent: 0,
    });
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="number"
            className="form-control"
            placeholder="Pages"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Book
        </button>
      </form>
    </div>
  );
};
export default AddBookForm;
