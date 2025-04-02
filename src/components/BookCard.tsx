import GalleryCard from './GalleryCard.tsx';
import { getFullBookId } from '../utils';
import { useEffect } from 'react';
import { BookStatus } from '../book.type.ts';

interface BookCardProps {
  bookId: number;
  title: string;
  image?: string;
  status?: BookStatus;
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
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toogle="tooltip"]'
    );
    for (const tooltipElement of tooltipTriggerList) {
      new window.bootstrap.Tooltip(tooltipElement);
    }
  }, []);

  return (
    <div id={getFullBookId(bookId)} title={`Book: ${title}`}>
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
