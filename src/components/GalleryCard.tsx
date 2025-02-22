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
      className={`card m-2 d-inline-block ${isSelected ? 'border-primary' : 'border-secondary'}`}
      style={{
        width: isSelected ? '180px' : '150px',
        cursor: 'pointer',
        flex: '0 0 auto',
        transition: 'all 0.3s ease',
      }}
      onClick={onSelect}
    >
      {image ? (
        <img src={image} className="card-img-top" alt={title} />
      ) : (
        <div className="card-body text-center">
          <h6 className="card-title">{title}</h6>
        </div>
      )}
    </div>
  );
};
export default GalleryCard;
