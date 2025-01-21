
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {  Image, Button } from 'react-bootstrap'


import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from "../../redux/app/hook";
import { useEffect, useContext } from 'react';
import {fetchCart,  fetchDeleteFromCart, fetchAddCartQty, fetchReduceCartQTY, fetchClearCart, getCartItems, getCartBills } from "../../redux/features/cart/cartSlice";
import { FavoriteContext } from '../../Context/wishlist';

const CartModal = () => {
  const {state} = useContext(FavoriteContext)
  const dispatch = useAppDispatch()
  const cartItems= useAppSelector(getCartItems)
  const cartBills= useAppSelector(getCartBills)
      
  useEffect(() =>{
    dispatch(fetchCart())
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [dispatch])
  console.log(cartItems)
  console.log(cartBills)
     
    return (
    
    <div className="flex-col flex items-center bg-white gap-8 p-10 text-black text-sm">
        
    <div className="row">
        
      {cartItems?.map((item) => (
        <div className="row" >
            <div className="d-flex">
  <div className="p-2 flex-fill"> <Image src={item.image} width="100px" alt={item.title} className="rounded-md h-24" /></div>
  <div className="p-2 flex-fill">
  <div className="d-flex flex-column mb-3">
  <div className="p-2"><h6 className="text-primary fw-medium">{item.title}</h6></div>
  <div className="p-2"><p className="text-gray-600">{state.currency}{item.price}</p></div>
  <div className="p-2"><div className="d-flex">
  <div className="p-2 flex-fill"><Button
              className="border "
              variant="light"
              onClick={() => {
                dispatch(fetchAddCartQty(item))
              }}
            >
              +
            </Button></div>
  <div className="p-2 flex-fill"> <Button variant="light" className='border'>{item.unit}</Button></div>
  <div className="p-2 flex-fill"><Button
  variant="light"
              className="border"
              onClick={() => {
                dispatch(fetchReduceCartQTY(item))
              }}
            >
              -
            </Button></div>
</div></div>
</div>
    

            
            </div>
  <div className="p-2 flex-fill"  onClick={() => {
                dispatch(fetchDeleteFromCart(item))
              }}><i className='bx bx-trash'></i></div>
</div>
          

        </div>
      ))}
    </div>
    {
      cartItems?.length > 0 ? (
        <div className="">
          <div className="d-flex mb-3">
  <div className="me-auto p-2 fs-4">Total:</div>
  <div className="p-2 fs-5 text-danger fw-bold">${cartBills}</div>
  
</div>

<div className="d-grid gap-2">
    
      <Button variant="outline-info" size="lg" onClick={() => {
          dispatch(fetchClearCart())
        }}>
        Clear Cart
      </Button>
     
      <Button  className="bg-dark text-white shadow-none" variant="outline-light" size="lg" >
      <Link to="/cart" className="text-decoration-none text-light">
       Check out
       </Link>
      </Button>
   
    </div>
      
     
    </div>
      ) : (
        <h1 className="text-lg font-bold">Your cart is empty</h1>
      )
    }
  </div>
 
  )
}

export default CartModal