
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

type RatingProps = {
    value:  number;
    text: string;
  };
const Rating: React.FC<RatingProps>  = ({ value, text }) => {
  return (
    <div className='rating'>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i}>
          {value >= i ? (
            <FaStar color='gold' />
          ) : value >= i - 0.5 ? (
            <FaStarHalfAlt color='gold' />
          ) : (
            <FaRegStar color='gold' />
          )}
        </span>
      ))}
      {text && <span> {text}</span>}
    </div>
  );
};

export default Rating;