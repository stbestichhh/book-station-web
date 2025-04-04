import GalleryCard from './GalleryCard.tsx';
import { Book } from '../book.type.ts';

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
      image="plus.svg"
    />
  );
};
export default AddBookCard;
