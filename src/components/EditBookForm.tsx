import { Book, BookStatus } from '../temp_data.ts';
import React, { useState } from 'react';
import MotionDivZOpacity from './MotionDivZOpacity.tsx';
import InfoCard from './InfoCard.tsx';
import { addPagesReadToday } from '../utils/dailyReadingTracket.tsx';

interface EditBookFormProps {
  book: Book;
  handleEditBook: (book: Book, bookProps: Partial<Exclude<Book, 'id'>>) => void;
  setIsEditingBook: (value: boolean) => void;
  setAddPagesRead: (value: boolean) => void;
  addPagesRead: boolean;
}

const EditBookForm = ({
  handleEditBook,
  book,
  setIsEditingBook,
  addPagesRead,
  setAddPagesRead,
}: EditBookFormProps) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [pages, setPages] = useState(String(book.pages));
  const [pagesRead, setPagesRead] = useState(String(book.pagesRead));
  const [image, setImage] = useState(book.image);
  const [description, setDescription] = useState(book.description);
  const [minutesSpent, setMinutesSpent] = useState(String(book.minutesSpent));
  const [status, setStatus] = useState<BookStatus | undefined>(book.status);
  const [bookPagesReadBeforeEdit, setBookPagesReadBeforeEdit] =
    useState<number>(Number(pagesRead));

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const changeImageToStatus = (
    image: string | undefined,
    status: BookStatus | undefined
  ) => {
    const map: Record<BookStatus, string> = {
      Reading: 'book_started.svg',
      'Want to read': 'book.svg',
      Completed: 'book_finished.svg',
      'Want to buy': 'book.svg',
    };

    if (
      !image ||
      image === 'book.svg' ||
      image === 'book_started.svg' ||
      image === 'book_finished.svg'
    ) {
      if (status) {
        return map[status];
      }
      return 'book.svg';
    }
    return image;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleEditBook(book, {
      ...book,
      title,
      author,
      pages: Number(pages),
      pagesRead: Number(pagesRead),
      description,
      image: changeImageToStatus(image, status),
      minutesSpent: Number(minutesSpent),
      status,
      year_finished:
        status === 'Completed' && !book.year_finished
          ? new Date().getFullYear()
          : undefined,
    });
    handleAddTodayStats();
    setIsEditingBook(false);
    setAddPagesRead(false);
  };

  const handleAddTodayStats = () => {
    const diff = Number(pagesRead) - bookPagesReadBeforeEdit;
    addPagesReadToday(diff);
    setBookPagesReadBeforeEdit(Number(pagesRead));
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
          Edit book
        </h1>
      </MotionDivZOpacity>
      <div style={{ paddingLeft: '10px' }}>
        <form onSubmit={handleSubmit}>
          {addPagesRead ? (
            <MotionDivZOpacity delay={0.5}>
              <InfoCard>
                <h1 className="text-light mb-4">
                  How many{' '}
                  <span style={{ color: 'rgb(57, 125, 236)' }}>
                    pages have you read
                  </span>
                  ?
                </h1>
                <input
                  type="text"
                  placeholder="..."
                  value={pagesRead}
                  onChange={(e) =>
                    setPagesRead(
                      isNaN(Number(e.target.value)) ? '' : e.target.value
                    )
                  }
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
          ) : (
            <>
              <MotionDivZOpacity delay={0.3}>
                <InfoCard>
                  <h1
                    className="text-light mb-4"
                    style={{ marginRight: '150px' }}
                  >
                    What is the book{' '}
                    <span style={{ color: 'orange' }}>title</span>?
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
                  <h1
                    className="text-light mb-4"
                    style={{ marginRight: '100px' }}
                  >
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
                      setPages(
                        isNaN(Number(e.target.value)) ? '' : e.target.value
                      )
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
              <MotionDivZOpacity delay={0.7}>
                <InfoCard>
                  <h1
                    className="text-light mb-4"
                    style={{ marginRight: '200px' }}
                  >
                    Book <span style={{ color: 'gray' }}>status</span>?
                  </h1>
                  <input
                    list={'status-options'}
                    placeholder="..."
                    value={status}
                    onChange={(e) => setStatus(e.target.value as BookStatus)}
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
                  <datalist id="status-options">
                    <option value={'Want to read'} />
                    <option value={'Reading'} />
                    <option value={'Completed'} />
                  </datalist>
                </InfoCard>
              </MotionDivZOpacity>
              <MotionDivZOpacity delay={0.4}>
                <InfoCard>
                  <h1 className="text-light mb-4">
                    Minutes spent{' '}
                    <span style={{ color: 'orangered' }}>reading</span>?
                  </h1>
                  <input
                    type="text"
                    placeholder="..."
                    value={minutesSpent}
                    onChange={(e) =>
                      setMinutesSpent(
                        isNaN(Number(e.target.value)) ? '' : e.target.value
                      )
                    }
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
                  <h1 className="text-light mb-4">
                    How many{' '}
                    <span style={{ color: 'rgb(57, 125, 236)' }}>
                      pages have you read
                    </span>
                    ?
                  </h1>
                  <input
                    type="text"
                    placeholder="..."
                    value={pagesRead}
                    onChange={(e) =>
                      setPagesRead(
                        isNaN(Number(e.target.value)) ? '' : e.target.value
                      )
                    }
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
              <MotionDivZOpacity delay={0.6}>
                <InfoCard>
                  <h1
                    className="text-light mb-4"
                    style={{ marginRight: '310px' }}
                  >
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
              <MotionDivZOpacity delay={0.9}>
                <InfoCard>
                  <h1
                    className="text-light mb-4"
                    style={{ marginRight: '150px' }}
                  >
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
                    style={{
                      color: 'white',
                      fontSize: '14px',
                      textAlign: 'right',
                    }}
                  >
                    {description.length}/{200} characters
                  </p>
                </InfoCard>
              </MotionDivZOpacity>
            </>
          )}
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
                  <strong>Edit Book</strong>
                </button>
              </MotionDivZOpacity>
            </div>
          )}
        </form>
      </div>
    </>
  );
};
export default EditBookForm;
