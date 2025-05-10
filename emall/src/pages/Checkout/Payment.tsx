


import "./checkout.css"

import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'

import {loadStripe} from '@stripe/stripe-js';
import { getClientSecret} from "../../redux/features/checkout/checkoutSlice";

import {Container,     Button,   } from "react-bootstrap"

import {  useEffect, useContext  } from "react";
import { FavoriteContext } from "../../Context/wishlist";
import { Card, Table } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../redux/app/hook"



import { fetchCurrentOrder, getCurrentOrder } from "../../redux/features/order/orderSlice";
import { ITEM } from "../../utils/@types";
const STRIPE = import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY

function Payment() {

  const clientSecret = useAppSelector(getClientSecret)
 const stripe = loadStripe(STRIPE)
  console.log(clientSecret)

  const {state} = useContext(FavoriteContext)
  
  const dispatch = useAppDispatch()
  const currentOrder = useAppSelector(getCurrentOrder)

  
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
 
      useEffect(() =>{
        dispatch(fetchCurrentOrder())
        
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [dispatch])
      
  
    
   
  return (
    <Container className='home' fluid>
        
        { clientSecret ? (
        <div className=" row">
          <div className="border col-7  border-start-0 border-bottom-0" >
        <Elements stripe={stripe} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
          </div>
          <div className="border col-5  border-start-0 border-bottom-0" >
          {currentOrder ? (<div className="">
              <div className=" text-dark text-start fs-4">ORDER INVOICE</div>
              <div className=" ">
              <div className="d-flex col-8 align-items-start border border-secondary border-end-0 border-start-0 flex-column me-2 ">
  <div className="p-1 text-dark fs-5">Order No: {"****" +currentOrder._id.substring(0, 4) + "******"}</div>
  <div className=" fs-6 text-dark">Placed on On: { weekday[new Date(currentOrder.date_added).getDay()]}, {currentOrder.date_added.slice(0,10)}</div>
  <div className="p-1 fs-6 text-dark">Number of items :{currentOrder.items.length}</div>
  {/* <div className="p-1 fs-6 text-dark">Gift wrapper :{state.currency}{currentOrder.giftwrapper}</div>
  <div className="p-1 fs-6 text-dark">Delivery Fee :{state.currency}{currentOrder.deliveryfee}</div> */}
  {/* <div className="p-1 fs-6 text-dark">Total: {state.currency}{currentOrder.bill}</div> */}
  <div className="p-1 fs-6 text-dark">Payment: {currentOrder.payment ? "Payment Successful!" : "Pending" }</div>
  <div className="p-1 fs-6 text-dark"><div className="text-dark">Delivery: {currentOrder.delivered ? "Delivery Completed" : "Pending"}</div> </div>
</div>

</div>


<Card className="mb-3">
      <Card.Header>
       Items Purchased
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal ($)</th>
            </tr>
          </thead>
          <tbody>
            
            {currentOrder.items?.map((item:ITEM, index:number) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.unit * item.price}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={3}><span>Delivery fee</span></td>
              <td><span>{currentOrder.deliveryfee}</span></td>
            </tr>
            <tr>
              <td colSpan={3}><span>Gift Wrapper</span></td>
              <td><span>{currentOrder.giftwrapper}</span></td>
            </tr>
            <tr>
              <td colSpan={3}><strong>Total</strong></td>
              <td><strong>{state.currency}{currentOrder.bill}</strong></td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
    <div className="d-flex">
<div className="p-2 ">
{/* {!currentOrder.payment && (<Button variant="dark" className="shadow-none rounded-1" size="lg" type="submit"   >
<Link to="/payment" className="text-decoration-none text-light">
 CONFIRM ORDER
 </Link>
</Button>)} */}

{currentOrder.payment && ( 
<Button className="d-flex align-items-end"  variant="dark" size="sm" >
<a  href={`/orderdetails/${currentOrder._id}`} className=" text-decoration-none text-reset">SEE DETAILS</a>
</Button>


)}

</div>
</div>
</div>

          ) : (<div className="fs-1 text-dark">No Order Exist</div>)}
              
            </div>
          </div>
        ) : (<div>Cannot create paymentn! plas try again</div>)
        }
     
      
    </Container>
   
  )
}

export default Payment;