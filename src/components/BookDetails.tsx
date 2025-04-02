import { Book } from '../book.type.ts';
import MotionDivZOpacity from './MotionDivZOpacity.tsx';
import { useEffect, useRef, useState } from 'react';
import { useStopwatch } from '../hooks/useTimer.tsx';
import EditBookForm from './EditBookForm.tsx';
import { addReadingMinutesToday } from '../utils/dailyReadingTracket.tsx';

interface BookDetailsProps {
  book: Book;
  onBack: () => void;
  handleDeleteBook: (book: Book) => void;
  handleEditBook: (book: Book, bookProps: Partial<Exclude<Book, 'id'>>) => void;
}

interface ButtonState {
  isHovered: boolean;
  isPressed: boolean;
}

const BookDetails = ({
  book,
  onBack,
  handleDeleteBook,
  handleEditBook,
}: BookDetailsProps) => {
  const [actionButtonPressed, setActionButtonPressed] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isEditingBook, setIsEditingBook] = useState(false);
  const [addPagesRead, setAddPagesRead] = useState(false);
  const [totalMinutesSpent, setTotalMinutesSpent] = useState(
    book.minutesSpent ?? 0
  );

  const handleEditClick = () => {
    setIsEditingBook(!isEditingBook);
  };

  const handleDeleteClick = () => {
    setShowConfirmDelete(!showConfirmDelete);
  };

  const handleConfirmDelete = () => {
    handleDeleteBook(book);
    setShowConfirmDelete(false);
  };

  const { mark, minutes, reset, toggleStopwatch, seconds, hours } =
    useStopwatch();

  const toggleActionButton = () => {
    if (actionButtonPressed) {
      setShowConfirmDelete(false);
    }
    setActionButtonPressed(!actionButtonPressed);
  };

  const handleStopwatch = () => {
    if (mark) {
      const totalMinutes = minutes + hours * 60;
      setTotalMinutesSpent((prev) => prev + totalMinutes);
      addReadingMinutesToday(totalMinutes);
      reset();
      setAddPagesRead(true);
      setIsEditingBook(true);
    }
    toggleStopwatch();
  };

  const [buttonStates, setButtonStates] = useState<Record<string, ButtonState>>(
    {
      go_back_btn: { isHovered: false, isPressed: false },
      read_btn: { isHovered: false, isPressed: false },
      actions_btn: { isHovered: false, isPressed: false },
      edit_btn: { isHovered: false, isPressed: false },
      delete_btn: { isHovered: false, isPressed: false },
      confirm_btn: { isHovered: false, isPressed: false },
    }
  );

  const currentBookRef = useRef<Book | null>(null);

  useEffect(() => {
    if (currentBookRef.current && currentBookRef.current.id !== book.id) {
      if (minutes > 0 || seconds > 0 || hours > 0) {
        currentBookRef.current.minutesSpent! += minutes + hours * 60;
      }
      reset();
      setShowConfirmDelete(false);
      setActionButtonPressed(false);
      setIsEditingBook(false);
    }
    currentBookRef.current = book;
  }, [book, minutes, seconds, hours, reset]);

  const handleMouseEvent = (
    buttonId: string,
    eventType: keyof ButtonState,
    value: boolean
  ) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [buttonId]: { ...prevState[buttonId], [eventType]: value },
    }));
  };

  const formatTime = (hours: number, minutes: number, seconds: number) => {
    const formattedHours =
      hours > 1
        ? hours.toString().length > 1
          ? `${hours}:`
          : `0${hours}:`
        : '';
    const formattedMinutes =
      minutes.toString().length > 1 ? minutes : `0${minutes}`;
    const formattedSeconds =
      seconds.toString().length > 1 ? seconds : `0${seconds}`;

    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <MotionDivZOpacity classes={''}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <h1
          style={{
            color: 'white',
            fontSize: '80px',
          }}
        >
          {book.title}
        </h1>
        <span
          style={{
            color: 'white',
            fontSize: '20px',
            whiteSpace: 'nowrap',
            backgroundColor: 'rgba(39, 43, 51, 0.5)',
            borderRadius: '20px',
            padding: '10px 20px 10px 20px',
          }}
        >
          {book.minutesSpent} minutes
        </span>
      </div>

      <div style={{ marginLeft: '5px' }}>
        <MotionDivZOpacity delay={0}>
          <h1
            style={{
              color: 'white',
              marginBottom: '10px',
              fontSize: '25px',
              fontWeight: 'lighter',
            }}
          >
            {book.author} - {book.status}
          </h1>
        </MotionDivZOpacity>
        <MotionDivZOpacity delay={0.1} classes={''}>
          <div
            style={{
              marginBottom: '40px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <button
              className="btn btn-secondary rounded-5"
              type="button"
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: buttonStates['go_back_btn'].isHovered
                  ? 'rgba(39, 43, 51, 0.3)'
                  : 'rgba(39, 43, 51, 0.5)',
                border: 'none',
                transition: 'background-color 0.3s ease, transform 0.2s ease',
                transform: buttonStates['go_back_btn'].isPressed
                  ? 'scale(0.95)'
                  : 'scale(1)',
                marginRight: '10px',
              }}
              onMouseEnter={() =>
                handleMouseEvent('go_back_btn', 'isHovered', true)
              }
              onMouseLeave={() =>
                handleMouseEvent('go_back_btn', 'isHovered', false)
              }
              onMouseDown={() =>
                handleMouseEvent('go_back_btn', 'isPressed', true)
              }
              onMouseUp={() =>
                handleMouseEvent('go_back_btn', 'isPressed', false)
              }
              onMouseOut={() =>
                handleMouseEvent('go_back_btn', 'isPressed', false)
              }
              onClick={onBack}
            >
              <img
                src="go_back.svg"
                alt="Arrow"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </button>
            <button
              className="btn btn-secondary rounded-5"
              type="button"
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: buttonStates['actions_btn'].isHovered
                  ? 'rgba(39, 43, 51, 0.3)'
                  : 'rgba(39, 43, 51, 0.5)',
                border: 'none',
                transition: 'background-color 0.3s ease, transform 0.2s ease',
                transform: buttonStates['actions_btn'].isPressed
                  ? 'scale(0.95)'
                  : 'scale(1)',
                marginRight: '10px',
              }}
              onMouseEnter={() =>
                handleMouseEvent('actions_btn', 'isHovered', true)
              }
              onMouseLeave={() =>
                handleMouseEvent('actions_btn', 'isHovered', false)
              }
              onMouseDown={() =>
                handleMouseEvent('actions_btn', 'isPressed', true)
              }
              onMouseUp={() =>
                handleMouseEvent('actions_btn', 'isPressed', false)
              }
              onMouseOut={() =>
                handleMouseEvent('actions_btn', 'isPressed', false)
              }
              onClick={toggleActionButton}
            >
              <img
                src="three_dots.svg"
                alt="Arrow"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </button>
            <div
              style={{
                width: actionButtonPressed ? '60px' : '0px',
                opacity: actionButtonPressed ? 1 : 0,
                overflow: 'hidden',
                transition: 'width 0.3s ease, opacity 0.3s ease',
                marginRight: actionButtonPressed ? '10px' : '0px',
              }}
            >
              <button
                className="btn btn-secondary rounded-5"
                type="button"
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: buttonStates['edit_btn'].isHovered
                    ? 'rgba(39, 43, 51, 0.3)'
                    : 'rgba(39, 43, 51, 0.5)',
                  border: 'none',
                  transition: 'background-color 0.3s ease, transform 0.2s ease',
                  transform: buttonStates['edit_btn'].isPressed
                    ? 'scale(0.95)'
                    : 'scale(1)',
                }}
                onMouseEnter={() =>
                  handleMouseEvent('edit_btn', 'isHovered', true)
                }
                onMouseLeave={() =>
                  handleMouseEvent('edit_btn', 'isHovered', false)
                }
                onMouseDown={() =>
                  handleMouseEvent('edit_btn', 'isPressed', true)
                }
                onMouseUp={() =>
                  handleMouseEvent('edit_btn', 'isPressed', false)
                }
                onMouseOut={() =>
                  handleMouseEvent('edit_btn', 'isPressed', false)
                }
                onClick={handleEditClick}
              >
                <img
                  src="edit_button.svg"
                  alt="Arrow"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </button>
            </div>
            <div
              style={{
                width: actionButtonPressed ? '60px' : '0px',
                opacity: actionButtonPressed ? 1 : 0,
                overflow: 'hidden',
                transition: 'width 0.3s ease, opacity 0.3s ease',
                marginRight: actionButtonPressed ? '10px' : '0px',
              }}
            >
              <button
                className="btn btn-secondary rounded-5"
                type="button"
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: buttonStates['delete_btn'].isHovered
                    ? 'rgba(39, 43, 51, 0.3)'
                    : 'rgba(39, 43, 51, 0.5)',
                  border: 'none',
                  transition: 'background-color 0.3s ease, transform 0.2s ease',
                  transform: buttonStates['delete_btn'].isPressed
                    ? 'scale(0.95)'
                    : 'scale(1)',
                }}
                onMouseEnter={() =>
                  handleMouseEvent('delete_btn', 'isHovered', true)
                }
                onMouseLeave={() =>
                  handleMouseEvent('delete_btn', 'isHovered', false)
                }
                onMouseDown={() =>
                  handleMouseEvent('delete_btn', 'isPressed', true)
                }
                onMouseUp={() =>
                  handleMouseEvent('delete_btn', 'isPressed', false)
                }
                onMouseOut={() =>
                  handleMouseEvent('delete_btn', 'isPressed', false)
                }
                onClick={handleDeleteClick}
              >
                <img
                  src="delete.svg"
                  alt="Arrow"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </button>
            </div>
            <div
              style={{
                width:
                  actionButtonPressed && showConfirmDelete ? '160px' : '0px',
                opacity: actionButtonPressed && showConfirmDelete ? 1 : 0,
                overflow: 'hidden',
                transition: 'width 0.3s ease, opacity 0.3s ease',
                marginRight:
                  actionButtonPressed && showConfirmDelete ? '10px' : '0px',
              }}
            >
              <button
                className="btn btn-secondary rounded-5"
                type="button"
                style={{
                  height: '60px',
                  padding: '0px 50px',
                  backgroundColor: buttonStates['confirm_btn'].isHovered
                    ? 'rgba(39, 43, 51, 0.3)'
                    : 'rgba(39, 43, 51, 0.5)',
                  border: 'none',
                  transition:
                    'background-color 0.3s ease, transform 0.2s ease, margin-left 0.3s ease',
                  transform: buttonStates['confirm_btn'].isPressed
                    ? 'scale(0.95)'
                    : 'scale(1)',
                }}
                onMouseEnter={() =>
                  handleMouseEvent('confirm_btn', 'isHovered', true)
                }
                onMouseLeave={() =>
                  handleMouseEvent('confirm_btn', 'isHovered', false)
                }
                onMouseDown={() =>
                  handleMouseEvent('confirm_btn', 'isPressed', true)
                }
                onMouseUp={() =>
                  handleMouseEvent('confirm_btn', 'isPressed', false)
                }
                onMouseOut={() =>
                  handleMouseEvent('confirm_btn', 'isPressed', false)
                }
                onClick={handleConfirmDelete}
              >
                <strong>Delete</strong>
              </button>
            </div>
            <button
              className="btn btn-secondary rounded-5"
              type="button"
              style={{
                height: '60px',
                padding: '0px 50px',
                backgroundColor: buttonStates['read_btn'].isHovered
                  ? 'rgba(39, 43, 51, 0.3)'
                  : 'rgba(39, 43, 51, 0.5)',
                border: 'none',
                transition:
                  'background-color 0.3s ease, transform 0.2s ease, margin-left 0.3s ease',
                transform: buttonStates['read_btn'].isPressed
                  ? 'scale(0.95)'
                  : 'scale(1)',
              }}
              onMouseEnter={() =>
                handleMouseEvent('read_btn', 'isHovered', true)
              }
              onMouseLeave={() =>
                handleMouseEvent('read_btn', 'isHovered', false)
              }
              onMouseDown={() =>
                handleMouseEvent('read_btn', 'isPressed', true)
              }
              onMouseUp={() => handleMouseEvent('read_btn', 'isPressed', false)}
              onMouseOut={() =>
                handleMouseEvent('read_btn', 'isPressed', false)
              }
              onClick={handleStopwatch}
            >
              <strong>
                {mark ? formatTime(hours, minutes, seconds) : 'Start reading'}
              </strong>
            </button>
          </div>
        </MotionDivZOpacity>
        {isEditingBook ? (
          <EditBookForm
            handleEditBook={handleEditBook}
            book={book}
            setIsEditingBook={setIsEditingBook}
            addPagesRead={addPagesRead}
            setAddPagesRead={setAddPagesRead}
            totalMinutesRead={totalMinutesSpent}
          />
        ) : (
          <>
            <MotionDivZOpacity delay={0.2} classes={''}>
              <h1
                style={{
                  color: 'white',
                  marginBottom: '10px',
                  fontSize: '25px',
                  fontWeight: 'lighter',
                }}
              >
                Pages read: {book.pagesRead}/{book.pages} -{' '}
                {((book.pagesRead! / book.pages) * 100).toFixed(1)}%
              </h1>
            </MotionDivZOpacity>
            <MotionDivZOpacity delay={0.3} classes={''}>
              <div>
                <h1
                  style={{
                    marginBottom: '2px',
                    fontSize: '25px',
                    fontWeight: 'normal',
                  }}
                >
                  About the book
                </h1>
                <p style={{ marginLeft: '2px', fontSize: '20px' }}>
                  {book.description}
                </p>
              </div>
            </MotionDivZOpacity>
          </>
        )}
      </div>
    </MotionDivZOpacity>
  );
};
export default BookDetails;
