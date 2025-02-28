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
  return (
    <div
      className={`card m-2 d-inline-block ${isSelected ? 'border-5' : 'border-0'}`}
      style={{
        width: isSelected ? '300px' : '200px',
        height: isSelected ? '300px' : '200px',
        cursor: 'pointer',
        flex: '0 0 auto',
        transition: 'all 0.3s ease',
        borderRadius: '30px',
        overflow: 'hidden',
      }}
      onClick={onSelect}
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
