import React, { useState } from 'react';
import { Book } from '../book.type.ts';
import MotionDivZOpacity from './MotionDivZOpacity.tsx';
import InfoCard from './InfoCard.tsx';

const AddBookForm = ({
  handleAddBook,
}: {
  handleAddBook: (book: Book) => void;
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddBook({
      title,
      author,
      pages: Number(pages),
      description,
      image: image,
      status: 'Want to read',
      pagesRead: 0,
      minutesSpent: 0,
    } as Book);
    setTitle('');
    setAuthor('');
    setPages('');
    setImage('');
    setDescription('');
  };

  const isFormValid = title && author && pages;

  return (
    <>
      <MotionDivZOpacity>
        <h1
          style={{
            color: 'white',
            marginBottom: '20px',
            fontSize: '80px',
          }}
        >
          Add new book
        </h1>
      </MotionDivZOpacity>
      <div style={{ paddingLeft: '10px' }}>
        <form onSubmit={handleSubmit}>
          <MotionDivZOpacity delay={0.3}>
            <InfoCard>
              <h1 className="text-light mb-4" style={{ marginRight: '150px' }}>
                What is the book <span style={{ color: 'orange' }}>title</span>?
              </h1>
              <input
                type="text"
                value={title}
                placeholder="..."
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{
                  padding: '10px 10px 10px 0px',
                  marginBottom: '10px',
                  width: '100%',
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  color: 'white',
                  fontSize: '30px',
                  outline: 'none',
                }}
              />
            </InfoCard>
          </MotionDivZOpacity>
          <MotionDivZOpacity delay={0.1}>
            <InfoCard>
              <h1 className="text-light mb-4" style={{ marginRight: '100px' }}>
                Who is the{' '}
                <span style={{ color: 'rgb(105, 206, 103)' }}>author</span>?
              </h1>
              <input
                type="text"
                value={author}
                placeholder="..."
                onChange={(e) => setAuthor(e.target.value)}
                required
                style={{
                  padding: '10px 10px 10px 0px',
                  marginBottom: '10px',
                  width: '100%',
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  color: 'white',
                  fontSize: '30px',
                  outline: 'none',
                }}
              />
            </InfoCard>
          </MotionDivZOpacity>
          <MotionDivZOpacity delay={0.2}>
            <InfoCard>
              <h1 className="text-light mb-4">
                How many{' '}
                <span style={{ color: 'rgb(57, 125, 236)' }}>pages</span>?
              </h1>
              <input
                type="text"
                placeholder="..."
                value={pages}
                onChange={(e) =>
                  setPages(isNaN(Number(e.target.value)) ? '' : e.target.value)
                }
                required
                style={{
                  padding: '10px 10px 10px 0px',
                  marginBottom: '10px',
                  width: '100%',
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  color: 'white',
                  fontSize: '30px',
                  outline: 'none',
                }}
              />
            </InfoCard>
          </MotionDivZOpacity>
          <MotionDivZOpacity delay={0.5}>
            <InfoCard>
              <h1 className="text-light mb-4" style={{ marginRight: '310px' }}>
                Book cover image{' '}
                <span style={{ color: 'rgb(95, 92, 222)' }}>URL</span>
              </h1>
              <input
                type="text"
                placeholder="https//..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                style={{
                  padding: '10px 10px 10px 0px',
                  marginBottom: '10px',
                  width: '100%',
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  color: 'white',
                  fontSize: '30px',
                  outline: 'none',
                }}
              />
            </InfoCard>
          </MotionDivZOpacity>
          <MotionDivZOpacity delay={0.4}>
            <InfoCard>
              <h1 className="text-light mb-4" style={{ marginRight: '150px' }}>
                Something about the{' '}
                <span style={{ color: 'orangered' }}>book</span>
              </h1>
              <textarea
                placeholder="..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={200}
                style={{
                  padding: '10px 10px 100px 0px',
                  marginBottom: '10px',
                  width: '100%',
                  height: '230px',
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  color: 'white',
                  fontSize: '30px',
                  outline: 'none',
                  resize: 'none',
                  overflow: 'hidden',
                }}
              />
              <p
                style={{ color: 'white', fontSize: '14px', textAlign: 'right' }}
              >
                {description.length}/{200} characters
              </p>
            </InfoCard>
          </MotionDivZOpacity>
          {isFormValid && (
            <div
              style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                zIndex: 10,
              }}
            >
              <MotionDivZOpacity>
                <button
                  className="btn btn-secondary rounded-5"
                  type="submit"
                  style={{
                    padding: '20px 60px 20px 60px',
                    backgroundColor: isHovered ? '#ededed' : 'rgb(38, 43, 52)',
                    color: isHovered ? 'rgb(38, 43, 52)' : '#ededed',
                    border: 'none',
                    transition:
                      'background-color 0.3s ease, transform 0.2s ease',
                    transform: isPressed ? 'scale(0.95)' : 'scale(1)',
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseOut={handleMouseUp}
                >
                  <strong>Add Book</strong>
                </button>
              </MotionDivZOpacity>
            </div>
          )}
        </form>
      </div>
    </>
  );
};
export default AddBookForm;
