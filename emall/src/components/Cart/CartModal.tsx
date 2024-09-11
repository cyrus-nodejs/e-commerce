
import { useContext } from 'react'
import {  Image, Button } from 'react-bootstrap'
import { CartContext } from '../../Context/cart'

import { Link } from 'react-router-dom'

const CartModal = () => {
   
  
  const {deleteFromCart, cartItems,  clearCart, getCartTotal,reduceQty, addQty
     } = useContext(CartContext)
     
      
     
    return (
    
    <div className="flex-col flex items-center bg-white gap-8 p-10 text-black text-sm">
        
    <div className="row">
        
      {cartItems.map((item) => (
        <div className="row" >
            <div className="d-flex">
  <div className="p-2 flex-fill"> <Image src={`http://localhost:3000/items/${item.image}`} width="100px" alt={item.title} className="rounded-md h-24" /></div>
  <div className="p-2 flex-fill">
  <div className="d-flex flex-column mb-3">
  <div className="p-2"><h6 className="text-primary fw-medium">{item.title}</h6></div>
  <div className="p-2"><p className="text-gray-600">${item.price}</p></div>
  <div className="p-2"><div className="d-flex">
  <div className="p-2 flex-fill"><Button
              className="border "
              variant="light"
              onClick={() => {
                addQty(item)
              }}
            >
              +
            </Button></div>
  <div className="p-2 flex-fill"> <Button variant="light" className='border'>{item.quantity}</Button></div>
  <div className="p-2 flex-fill"><Button
  variant="light"
              className="border"
              onClick={() => {
                reduceQty(item)
              }}
            >
              -
            </Button></div>
</div></div>
</div>
    

            
            </div>
  <div className="p-2 flex-fill"  onClick={() => {
                deleteFromCart(item)
              }}><i className='bx bx-trash'></i></div>
</div>
          

        </div>
      ))}
    </div>
    {
      cartItems.length > 0 ? (
        <div className="">
          <div className="d-flex mb-3">
  <div className="me-auto p-2 fs-4">Total:</div>
  <div className="p-2 fs-5 text-danger fw-bold">${getCartTotal()}</div>
  
</div>

<div className="d-grid gap-2">
    
      <Button variant="outline-info" size="lg" onClick={() => {
          clearCart()
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