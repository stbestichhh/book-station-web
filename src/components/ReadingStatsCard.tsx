import GalleryCard from './GalleryCard.tsx';
import { Book } from '../temd_data.ts';

interface ReadingStatsCardProps {
  onSelect: (book: Book | null) => void;
  selectedBook: Book | null;
}

const ReadingStatsCard = ({
  onSelect,
  selectedBook,
}: ReadingStatsCardProps) => {
  return (
    <GalleryCard
      title={`Reading stats`}
      onSelect={() => onSelect(null)}
      isSelected={selectedBook === null}
    />
  );
};
export default ReadingStatsCard;
