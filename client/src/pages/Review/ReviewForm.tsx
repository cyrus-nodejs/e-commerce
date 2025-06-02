import React, { useState } from 'react';

import StarRating from './StarRating';
import { useAppDispatch, useAppSelector } from "../../redux/app/hook"
import { fetchAddReviewItem, getMessage, getUserHasReviewed } from '../../redux/features/items/itemSlice';
type ReviewFormProps = {
    productId: string | number | undefined;
    onReviewSuccess: () => void;
  };
  
const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onReviewSuccess }) => {

    
  const dispatch = useAppDispatch()
  const messageReview = useAppSelector(getMessage)
  const userHasReviewed = useAppSelector(getUserHasReviewed)
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState(messageReview);
  const [loading, setLoading] = useState(false);
const data = {rating, comment, productId}
  const submitReview = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (rating === 0) {
      setMessage('Please select a star rating.');
      return;
    }
console.log(productId)

    try {
      dispatch(fetchAddReviewItem(data))

      setMessage('Review submitted successfully!');
      setComment('');
      setRating(0);
      onReviewSuccess
    } catch (err) {
      setMessage( 'Failed to submit review');
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    {userHasReviewed ? (
        // <Message variant='info'>You have already reviewed this product.</Message>
        <p >You have already reviewed this product.</p>
      ) : (
        <>
        <form onSubmit={submitReview} style={{ maxWidth: '500px' }}>
        <h3>Leave a Review</h3>
  
        <StarRating rating={rating} onChange={setRating} />
  
        <textarea
          placeholder="Write your comment"
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ width: '100%', marginTop: '10px' }}
          required
        />
  
        <button type="submit" disabled={loading} style={{ marginTop: '10px' }}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
  
        {message && <p style={{ marginTop: '10px', color: 'red' }}>{message}</p>}
      </form>
        </>
      )}
    </div>
  );
};

export default ReviewForm;