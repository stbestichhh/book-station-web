import { useState } from 'react';

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
      className={`card m-2 d-inline-block ${isSelected ? 'border-5' : 'border-0'}`}
      style={{
        width: isSelected ? '300px' : '200px',
        height: isSelected ? '300px' : '200px',
        cursor: 'pointer',
        flex: '0 0 auto',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        borderRadius: '30px',
        backgroundColor: 'rgb(102\t103\t108\t)',
        border: isHovered || isSelected ? 'solid 5px transparent' : 'none',
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
          borderRadius: '25px',
        }}
      />
    </div>
  );
};
export default GalleryCard;
