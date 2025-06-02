import  { useState } from 'react';

type StarRatingProps = {
    rating:  number;
    onChange: React.Dispatch<React.SetStateAction<number>>;
  };
  
const StarRating: React.FC<StarRatingProps>  = ({ rating, onChange }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;

        return (
          <span
            key={index}
            style={{
              fontSize: '1.8rem',
              cursor: 'pointer',
              color: starValue <= (hover || rating) ? '#ffc107' : '#e4e5e9',
            }}
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;