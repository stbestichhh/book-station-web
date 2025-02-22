import GalleryCard from './GalleryCard.tsx';
import { getFullBookId } from '../utils';

interface BookCardProps {
  bookId: number;
  title: string;
  image: string;
  onSelect: () => void;
  isSelected: boolean;
}

const BookCard = ({
  bookId,
  title,
  image,
  onSelect,
  isSelected,
}: BookCardProps) => {
  return (
    <div id={getFullBookId(bookId)}>
      <GalleryCard
        title={title}
        onSelect={onSelect}
        image={image}
        isSelected={isSelected}
      />
    </div>
  );
};
export default BookCard;
