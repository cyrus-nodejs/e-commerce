/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
 import {loadStripe} from '@stripe/stripe-js';
import {useEffect, useState} from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Spinner, Button } from 'react-bootstrap';



// import { Link } from 'react-router-dom';

 import {  useAppDispatch } from '../../redux/app/hook';

import { fetchConfirmPayment } from '../../redux/features/order/orderSlice';
 const STRIPE = import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY


function Completion() {

   const dispatch = useAppDispatch()

const stripePromise = loadStripe(STRIPE);
 


  
  
const location = useLocation();
const navigate = useNavigate();
const [status, setStatus] = useState(null);
const [loading, setLoading] = useState(true);

const query = new URLSearchParams(location.search);
const clientSecret = query.get('payment_intent_client_secret');
// const redirectStatus = query.get('redirect_status');

useEffect(() => {
  const confirmStatus = async () => {
    if (!clientSecret) {
      setStatus('failed');
      setLoading(false);
      return;
    }

    const stripe = await stripePromise;
    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

    if (paymentIntent.status === 'succeeded') {
      setStatus('success');
      dispatch(fetchConfirmPayment(paymentIntent.id))
    } else {
      setStatus('failed');
    }

    setLoading(false);
  };

  confirmStatus();
}, [clientSecret, dispatch, stripePromise]);

const handleGoHome = () => navigate('/');
const handleRetry = () => navigate('/payment');
  return (
    <Container className="mt-5" fluid>
    <Row className="justify-content-md-center">
      <Col md={6}>
        <Card className="text-center shadow p-4">
          {loading && (
            <>
              <Spinner animation="border" />
              <p className="mt-3">Verifying payment...</p>
            </>
          )}

          {!loading && status === 'success' && (
            <>
              <Card.Title className="text-success display-6">🎉 Payment Successful!</Card.Title>
              <Card.Text className="mt-3">
                Thank you! Your payment was processed successfully.
              </Card.Text>
              <Button variant="primary" onClick={handleGoHome}>Go to Home</Button>
            </>
          )}

          {!loading && status === 'failed' && (
            <>
              <Card.Title className="text-danger display-6">❌ Payment Failed</Card.Title>
              <Card.Text className="mt-3">
                Something went wrong. Please try again.
              </Card.Text>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="danger" onClick={handleRetry}>Try Again</Button>
                <Button variant="secondary" onClick={handleGoHome}>Go to Home</Button>
              </div>
            </>
          )}
        </Card>
      </Col>
    </Row>
  </Container>
  );
}

export default Completion;