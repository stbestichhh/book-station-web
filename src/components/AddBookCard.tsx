import GalleryCard from './GalleryCard.tsx';
import { Book } from '../temp_data.ts';

interface AddingBookCardProps {
  onSelect: () => void;
  selectedBook: Book | null;
  isAddingBook: boolean;
}

const AddBookCard = ({
  onSelect,
  selectedBook,
  isAddingBook,
}: AddingBookCardProps) => {
  return (
    <GalleryCard
      title={`Add new book`}
      onSelect={onSelect}
      isSelected={selectedBook === null && isAddingBook}
    />
  );
};
export default AddBookCard;
