import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Row, Col,  ProgressBar, Button } from "react-bootstrap"
import {  useEffect, useContext  } from "react";
import { FavoriteContext } from "../../Context/wishlist";
import { ITEM } from "../../utils/@types";
import Countdown from 'react-countdown';
import { RENDER } from "../../utils/@types";
import "./Home.css"
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../redux/app/hook";
import { getTopdeals, fetchTopDeals } from "../../redux/features/items/itemSlice";

import { fetchAddCart } from "../../redux/features/cart/cartSlice";
// import { getAuthUser, fetchAsyncUser } from "../../redux/features/auth/authSlice";
const TopDeals = () => {
const dispatch = useAppDispatch()
const topdeals = useAppSelector(getTopdeals)
// const authUser = useAppSelector(getAuthUser)
  const Completionist = () => <span>You are good to go!</span>;
  const renderer = ({ days, hours, minutes, seconds, completed }:RENDER) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return <span className="text-light  fs-5 fw-medium">{days} <span className="fs-6  my-3">DAYS</span> : {hours} <span className="fs-6">HRS</span> :{minutes} <span className="fs-6">MINS </span>:{seconds} <span className="fs-6">SECS</span> </span>;
    }
  };

  const {state} = useContext(FavoriteContext)
     
    useEffect(() =>{
  dispatch(fetchTopDeals())
  
    }, [dispatch])
  
    // useEffect(() =>{
    //   dispatch(fetchAsyncUser())
      
    //     }, [dispatch])
  return (
    <Row className="my-3">
      {topdeals && topdeals.length  > 0 && (<div><div className="d-flex row mb-3">
   
  
   <div className="row">
 <Col sm={12} md={4} lg={4} className="mx-auto row fs-4 border-info  border-bottom p-2">Top Deals Of The Day</Col>
 <Col sm={12} md={4} lg={4} className="p-2 fs-4">
 Offer ends in:</Col>
 <Col sm={12} md={4} lg={4} className=" text-bg-danger fs-6 p-2 rounded-2" > <Countdown
   date={Date.now() + 500000000}
   renderer={renderer}
   
 /></Col>
</div>
 
   
 

</div>


       <Row>
      
       {topdeals?.map((items:ITEM) => {
           return (
               <Col  style={{margin:"mx-3"}}>
                   <Row className="bg-white border-light border rounded-2  position-relative">
                <Col sm={4} className="pt-5" > <Link  to={`/product/${items._id}`} className=" text-decoration-none text-reset"><LazyLoadImage src={items.image} style={{ width: '130px', height: '130px' }}     effect="blur" /></Link></Col>
               <Col sm={7} className="bg-white py-5" >
               <div className="d-flex flex-column  bg-white">
 <div className="p-2 fw-medium text-primary">{items.title.substring(0, 25)}</div>
 {/* <div className="d-inline-flex gap-1 p-2 text-warning">{items.rating}{items.review}</div> */}
 <div className="p-2 text-danger fs-5 fw-normal">{state.currency}{items.price}<span className="text-secondary mx-2 fw-normal fs-5 text-decoration-line-through">{state.currency}{items.price}</span></div>
  <div className="p-2 fs-6 d-none d-sm-block">{items.description.substring(0, 90) + ".."}</div> 
 <div className=""> <ProgressBar variant="" className='progressbar' now={5} /></div>
 <div className="p-2">Sold: {5}/{items.quantity} products</div>
 {/* {items.discount && (<div className="top-left  fw-bold rounded-1 px-2 text-light bg-success">{items.discount}%</div>)} */}
  <div className="text-center d-grid gap-2"><Button size="sm" className="d-block" variant="dark" onClick={() => dispatch(fetchAddCart(items))} >Add to cart</Button></div>  

    
</div>
               
               </Col> 
               </Row>
               </Col>
               
               
           )
       } )}
       </Row></div>)}
      
        
    </Row>
  )
}

export default TopDeals