import GalleryCard from './GalleryCard.tsx';
import { getFullBookId } from '../utils';

interface BookCardProps {
  bookId: number;
  title: string;
  image?: string;
  status?: 'Reading' | 'Want to read' | 'Want to buy' | 'Completed';
  onSelect: () => void;
  isSelected: boolean;
}

const BookCard = ({
  bookId,
  title,
  image,
  onSelect,
  isSelected,
  status
}: BookCardProps) => {
  let bookImage = image || 'book.svg';

  if (!image && status) {
    const statusMap: Record<string, string> = {
      'Reading': 'book_started.svg',
      'Completed': 'book_finished.svg',
    };

    bookImage = statusMap[status] || 'book.svg';
  }

  return (
    <div id={getFullBookId(bookId)}>
      <GalleryCard
        title={title}
        onSelect={onSelect}
        image={bookImage}
        isSelected={isSelected}
      />
    </div>
  );
};
export default BookCard;
