import GalleryCard from './GalleryCard.tsx';
import { Book } from '../book.type.ts';

interface ReadingStatsCardProps {
  onSelect: (book: Book | null) => void;
  selectedBook: Book | null;
  isAddingBook: boolean;
  setIsAddingBook: (status: boolean) => void;
}

const ReadingStatsCard = ({
  onSelect,
  selectedBook,
  isAddingBook,
  setIsAddingBook,
}: ReadingStatsCardProps) => {
  const onReadingStatsSelect = () => {
    onSelect(null);
    setIsAddingBook(false);
  };

  return (
    <GalleryCard
      title={`Reading stats`}
      onSelect={onReadingStatsSelect}
      isSelected={selectedBook === null && !isAddingBook}
      image="main_card.svg"
    />
  );
};
export default ReadingStatsCard;
