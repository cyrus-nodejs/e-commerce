
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Row,  Container } from "react-bootstrap";
import { ORDERITEM, ITEM } from "../../utils/@types";
import "./checkout.css"

import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'

import Navbar from "../../components/Navbar/Navbar";
import { getClientSecret, getStripePromise } from "../../redux/features/checkout/checkoutSlice";
import { getIsAuthenticated, getUpdateUser } from "../../redux/features/auth/authSlice";
import { getCurrentOrder, getOrderItems } from "../../redux/features/order/orderSlice";

function Payment() {
  
const dispatch = useAppDispatch()
  const clientSecret = useAppSelector(getClientSecret)
  const stripePromise = useAppSelector(getStripePromise)
  const currentOrder = useAppSelector(getCurrentOrder)
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const user = useAppSelector(getUpdateUser)
  const orderItems =  useAppSelector(getOrderItems)
  
  useEffect(() =>{
    dispatch(fetchConfig())
      }, [dispatch])

      useEffect(() => {
        dispatch(fetchOrder())
      
      }, [dispatch]);
  return (
    <Container fluid>
       {isAuthenticated && user ( <Row>
        {clientSecret && stripePromise ? ( <div className=" row">
          <div className="border col-7  border-start-0 border-bottom-0" >
        
   
   
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
    
    
    
          </div>
          <div className="border  col-5  " >
          
          <div className="flex-col flex items-center bg-white gap-8 p-10 text-black text-sm">
          
          <div className="row">
              
            {currentOrder.map((order:ITEM) => (
              
                  
         
        <div>
         
          {orderItems.map((item:ORDERITEM) => 
          <div>
    
    
    
   <div class="d-flex align-items-center">
  <div class="flex-shrink-0 position-relative">
  <img src={item.image} width="70px" alt={item.title} className="rounded-md h-24" />
  <span className="position-absolute top-0 text-light start-100 translate-middle badge rounded-pill opacity-50 text-bg-dark"> {item.quantity}  <span className="visually-hidden">unread messages</span></span>
  </div>
  <div class="flex-grow-1 ms-3">
  <div class="d-flex mb-3">
  <div class="mt-2 ms-auto">{item.title}({item.quantity})</div>
  
  <div class="ms-auto p-2">${item.price}</div>
</div>
  </div>
</div>
   </div>
  )}
  
    
    
  
      <div className="">
        <div className="d-flex mb-3">
  <div className="me-auto p-2 ">Item(s) total ({order.items.length}):</div>
  <div className="p-2 ">${order.bill}</div>
  
  </div>
  <div className="d-flex mb-3">
  <div className="me-auto p-2 ">Delivery :</div>
  <div className="p-2 ">${order.deliveryfee}</div>
  
  </div>
  <div className="d-flex mb-3">
  <div className="me-auto p-2 ">Gift wrapper:</div>
  <div className="p-2 ">${order.giftwrapper}</div>
  
  </div> 
  <div className="d-flex mb-3">
  <div className="me-auto p-2 ">Total:</div>
  <div className="p-2   fw-bold">${order.bill}</div>
  
  </div>
  
  <div className="d-grid gap-2">
   
  
  </div>
    
   
  </div>
    
                  
  </div>           
      
      
                
      
              
            ))}
        
          
            
          
        </div>
        </div>
       
          </div>
        </div>)
         :
         (<div className="p-5">
          <Navbar />
          <p className="fs-1 text-center">No order exist</p>
          </div>) }
        
      </Row>)  }
     
      
    </Container>
   
  );
}

export default Payment;