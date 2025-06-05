
import {Request, Response} from 'express'
import { Item} from "../models/Item";
import {Order} from "../models/Order"
import { IUser } from '../models/User';

//create user address 
export const createReview = async (req:Request, res:Response) => {
     const user = req.user as IUser
 const userId = user._id
const { rating, comment, productId } = req.body;
console.log(req.body)

try {

const product = await Item.findById(productId);
const now = new Date()

if (!product) {
return res.status(404).json({ message: 'Product not found' });
}

    // Check if user already reviewed
const alreadyReviewed = product.reviews.find((review: { user: { toString: () => any; }; }) => review.user.toString() === userId.toString());
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    // Find an order containing this product for this user, delivered 2 mins ago
const order = await Order.findOne({
      owner: userId,
      'items.itemId': productId,
      delivery:'pending',
      isDelivered:false,
      deliveredAt: { $lte: new Date(now.getTime() + 2 * 60 * 1000) },
      
});
   // new Date(p.purchasedAt) <= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  // new Date(p.purchasedAt) <= new Date(now.getTime() + 2 * 60 * 1000
 
if (!order) {
  return res.status(400).json({ message: 'You can only review this product  after purchase'});
    }

 
 // Add review
    const review = {
      user: userId,
      name: `${user.firstname} ${user.lastname}`,
      rating: Number(rating),
      comment,
    };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =product.reviews.reduce((acc: any, r: { rating: any; }) => acc + r.rating, 0) / product.numReviews;

   //update delivery status
 order.delivery = 'delivered'
 order.isDelivered =true
   
  order.save()
  product.save();
    
  res.status(201).json({ message: 'Review added successfully' });
  
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Network error' });
  }
}


