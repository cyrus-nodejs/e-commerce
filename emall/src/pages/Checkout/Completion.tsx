/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {loadStripe} from '@stripe/stripe-js';
import {useEffect, useState} from 'react';


import {  Button, Container } from 'react-bootstrap';


import { Link } from 'react-router-dom';

import {  useAppDispatch } from '../../redux/app/hook';

import { fetchConfirmPayment } from '../../redux/features/order/orderSlice';
const STRIPE = import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY
function Completion() {
  const [ messageBody, setMessageBody ] = useState(null);
  
  const [paymentIntent, setPaymentIntent] = useState("")
  const dispatch = useAppDispatch()

console.log(STRIPE)
 const stripe = loadStripe(STRIPE)

 
  useEffect(() => {
    if (!stripe) return;

    stripe.then(async (stripe: { retrievePaymentIntent: (arg0: string | null) => PromiseLike<{ error: unknown; paymentIntent: unknown; }> | { error: unknown; paymentIntent: unknown; }; }) => {
      const url  = new URL(window.location);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      setPaymentIntent(paymentIntent)
      setMessageBody(error ? ` ${error.message}` : 
        <> Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
      );
    });
  }, [stripe]);

  
  

  return (
    <Container fluid>
      <h1>Thank you!</h1>
      <div id="messages" role="alert" className="fs-2" style={messageBody ? {display: 'block'} : {}}>{messageBody}</div>
      <div className="">
        
      {paymentIntent.status == 'succeeded' ? ( <div className="mx-5 px-5 col-6">
        <p className=' fs-1'>Payment Successful!</p>
        <p className=" fs-1"> Please Validate to continue!</p>
        <Button variant="dark" className="shadow-none  rounded-1" size="lg" type="submit" onClick={() => dispatch(fetchConfirmPayment(paymentIntent))} >
         <Link to="/orderinvoice"  className="text-decoration-none text-light">
          Validate Order!
          </Link>
         </Button>
         {/* {messageBody && (<div>
          
      <p> <span className="text-danger fs-2">{messageBody}</span><Link to="/" className=" fs-2 " >Back to Home</Link></p>
         </div>)} */}
         </div>  
      ) : (
        <div className="mx-5 px-5 col-6">
        <p className='p-3 fs-1'>Payment Failed! try again!</p>
    <Button variant="dark" className="shadow-none p-3 col-3 mb-2 rounded-1" size="lg" type="submit"  >
      <Link to="/payment"  className="text-decoration-none text-light">
      TRY AGAIN!
       </Link>
      </Button></div >)}
    
      
      
    </div>
    </Container>
  );
}

export default Completion;