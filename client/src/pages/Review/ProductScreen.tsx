import ReviewForm from './ReviewForm';
import { useEffect, useState } from 'react';

import { getAllOrder, fetchAllOrders } from '../../redux/features/order/orderSlice';
import {  useAppSelector, useAppDispatch } from '../../redux/app/hook';
const ProductScreen = ({ productId }:{ productId: string | undefined}) => {
    // Assume you check eligibility elsewhere
    const [canReview, setCanReview] = useState(false);
    const allOrders = useAppSelector(getAllOrder)
    const dispatch = useAppDispatch()
  console.log(allOrders)

  useEffect(() => {
   dispatch(fetchAllOrders())
  }, [ dispatch]);

    useEffect(() => {
        const checkEligibility = async () => {
            const now = new Date()
          const orderWithProduct = allOrders && ( allOrders.find(order =>
            order.items.some((item: { itemId: string; }) => item.itemId === productId)
          ))
      
          if (orderWithProduct && new Date(orderWithProduct.deliveredAt) <= new Date(now.getTime() + 2 * 60 * 1000 )) {
            setCanReview(true);
          }
        };
        checkEligibility();
      }, [allOrders, productId]);
    return (
      <div>
        {canReview ? (
          <ReviewForm productId={productId} onReviewSuccess={() => alert('Thanks for your review!')} />
        ) : (
          <p>You can leave a review  after Purchase &  delivery.</p>
        )}
      </div>
    );
  };

  export default ProductScreen;