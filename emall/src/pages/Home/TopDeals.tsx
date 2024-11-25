
import { Row, Col, Image, ProgressBar, Button } from "react-bootstrap"
import { useEffect } from "react";
import { ITEM } from "../../utils/@types";
import Countdown from 'react-countdown';
import { RENDER } from "../../utils/@types";
import "./Home.css"
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../redux/app/hook";
import { getTopdeals, fetchTopDeals } from "../../redux/features/items/itemSlice";
import { fetchAddRecentlyViewed, fetchAddRelated } from "../../redux/features/items/itemSlice";
import { fetchAddCart } from "../../redux/features/cart/cartSlice";

const TopDeals = () => {
const dispatch = useAppDispatch()
const topdeals = useAppSelector(getTopdeals)
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

  
     
    useEffect(() =>{
  dispatch(fetchTopDeals())
  
    }, [dispatch])
  
  
  return (
    <Row className="my-3">
      {topdeals && topdeals.length  > 0 ? (<div><div className="d-flex row mb-3">
   
  
   <div className="d-flex mb-3">
 <div className="me-auto fs-4 border-info  border-bottom p-2">Top Deals Of The Day</div>
 <div className="p-2 fs-4">
 Hurry up! Offer ends in:</div>
 <div className=" text-bg-danger fs-6 p-2 rounded-2"> <Countdown
   date={Date.now() + 24000000}
   renderer={renderer}
   
 /></div>
</div>
 
   
 

</div>


       <Row>
      
       {topdeals?.map((items:ITEM) => {
           return (
               <Col  style={{margin:"20px"}}>
                   <Row className="bg-white border-light border rounded-2  position-relative">
                <Col className="p-5" > <Link onClick={() =>{dispatch(fetchAddRecentlyViewed(items)); dispatch(fetchAddRelated(items))   }}  to={`/product/${items.title}`} className="p-2 text-decoration-none text-reset"><Image src={items.image} fluid loading="lazy" /></Link></Col>
               <Col className="bg-white">
               <div className="d-flex flex-column mb-3 bg-white">
 <div className="p-2 fw-medium text-primary">{items.title.substring(0, 25)}</div>
 {/* <div className="d-inline-flex gap-1 p-2 text-warning">{items.rating}{items.review}</div> */}
 <div className="p-2 text-danger fs-5 fw-normal">${items.newprice}<span className="text-secondary mx-2 fw-normal fs-5 text-decoration-line-through">${items.price}</span></div>
 <div className="p-2 fs-6">{items.description.substring(0, 100)}</div>
 <div className=""> <ProgressBar variant="" className='progressbar' now={5} /></div>
 <div className="p-2">Sold: {5}/{items.quantity} products</div>
 {items.discount && (<div className="top-left  fw-bold rounded-1 px-2 text-light bg-success">{items.discount}%</div>)}
 <div className="text-center d-grid gap-2"><Button size="sm" className="d-block" variant="dark" onClick={() => dispatch(fetchAddCart(items))} >Add to cart</Button></div> 
</div>
               
               </Col> 
               </Row>
               </Col>
               
               
           )
       } )}
       </Row></div>):<div className="fs-4 my-2 text-center">Topdeals items loading...</div>}
      
        
    </Row>
  )
}

export default TopDeals