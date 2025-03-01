import { useState } from 'react';

interface ArrowButtonProps {
  onClick: () => void;
  arrowDirection: '90' | '-90';
}

const ArrowButton = ({ onClick, arrowDirection }: ArrowButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="btn btn-secondary rounded-circle"
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: isHovered ? 'rgb(62, 65, 72)' : 'rgb(38, 43, 52)',
        border: 'none',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src="arrow_button.svg"
        alt="Arrow"
        style={{
          width: '100%',
          height: '100%',
          rotate: `${arrowDirection}deg`,
        }}
      />
    </button>
  );
};
export default ArrowButton;
