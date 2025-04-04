import { useState } from 'react';
import '../styles/galleryCard.css';

interface GalleryCardProps {
  title: string;
  image?: string;
  isSelected?: boolean;
  onSelect: () => void;
}

const GalleryCard = ({
  title,
  image,
  onSelect,
  isSelected,
}: GalleryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`card m-2 d-inline-block gallery-card ${isSelected ? 'selected' : ''}`}
      style={{
        cursor: 'pointer',
        flex: '0 0 auto',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        borderRadius: '30px',
        backgroundColor: 'rgb(38, 43, 52)',
        border: isSelected ? 'solid transparent 7px' : 'none',
        backgroundClip: 'padding-box',
        boxShadow:
          isHovered || isSelected
            ? '0px 0px 0px 5px rgba(181, 175, 174, 0.4)'
            : 'none',
      }}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image}
        className="card-img-top"
        alt={title}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          borderRadius: '20px',
        }}
      />
    </div>
  );
};
export default GalleryCard;
