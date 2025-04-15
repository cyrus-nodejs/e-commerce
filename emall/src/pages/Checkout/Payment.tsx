

import {  Container } from "react-bootstrap";

import "./checkout.css"
import { useEffect } from "react";
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'
import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
import {loadStripe} from '@stripe/stripe-js';
import { getClientSecret, fetchConfig, getStripePromise  } from "../../redux/features/checkout/checkoutSlice";
import OrderInvoice from "../Order/OrderInvoice";


function Payment() {
  
const dispatch = useAppDispatch()
  const clientSecret = useAppSelector(getClientSecret)
  const stripePromise = useAppSelector(getStripePromise)
  const stripe = loadStripe(stripePromise)
  console.log(clientSecret)
  useEffect(() =>{
    dispatch(fetchConfig())
      }, [dispatch])

      useEffect(() =>{
        clientSecret
          }, [clientSecret, dispatch])
    
   
  return (
    <Container fluid>
        
        <div className=" row">
          <div className="border col-7  border-start-0 border-bottom-0" >
        <Elements stripe={stripe} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
          </div>
          <div className="border col-5  border-start-0 border-bottom-0" >
            <OrderInvoice />
            </div>
          </div>
       
      
     
      
    </Container>
   
  )
}

export default Payment;