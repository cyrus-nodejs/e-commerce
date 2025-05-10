
import { Col, Row,Button, Container, Image} from "react-bootstrap"
import Navbar from "../../components/Navbar/Navbar"
import { ITEM } from "../../utils/@types";

import  "../../index.css"
import { useParams } from "react-router-dom";


import { fetchAddCart } from "../../redux/features/cart/cartSlice";

import { fetchOrderDetails, getOrderDetails, getOrderDetailsItems } from "../../redux/features/order/orderSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
import {  useEffect, useContext  } from "react";
import { FavoriteContext } from "../../Context/wishlist";
const OrderDetails = () => {
    const dispatch = useAppDispatch()
    // const isAuthenticated = useAppSelector(getIsAuthenticated)
    // const user = useAppSelector(getAuthUser)
  const orderDetails = useAppSelector(getOrderDetails)
  const orderDetailsItems =  useAppSelector(getOrderDetailsItems) 
const {state} = useContext(FavoriteContext)
 
      useEffect(() =>{
        dispatch(fetchOrderDetails())
        
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [dispatch])
      
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     const orderWeekDay= (date: any) =>{
      const newDate = new Date(date)
      const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
       return weekday[newDate.getDay()]
     }
   
   
     const { id }  = useParams()
    
    
      useEffect(() =>{
        dispatch(fetchOrderDetails(id));
        
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [])
          
          
  return (
    <div>
    <Navbar />
    <Container className='home' >
<div><Col >
  
    {orderDetails ? (<div><div className="text-dark text-start my-3 fs-4">Order Details</div>
 <Row  className=" my-2" >

  <div className="d-flex align-items-start flex-column border border-start-0 border-end-0 " >
 
<div className="mb-auto p-2   ">

<div className="text-dark fs-5">Order Id: {orderDetails?._id}</div>
  <div className='text-black'> {orderDetailsItems?.length} items</div>
  <div className='text-black'>Placed on  {orderDetails?.date_added}</div>
<div className="text-dark">Total: ${orderDetails?.bill}</div>
<div className="text-dark">Payment: {orderDetails?.payment ? "Successful!" : "Pending" }</div>
<div className="text-dark">Delivery: {orderDetails?.delivered ? "Completed" : "Pending"}</div>
</div>
</div>
<div className="text-dark fs-5 my-3 text-start">ITEMS IN YOUR ORDER</div>
    {orderDetailsItems?.map((items:ITEM) =>{
 return (
   <Row  className="border rounded-2 my-2" >
    <div className="text-dark text-start fs-4">Payment: {orderDetails?.payment? "Successful!" : "Pending" }</div>
    <div className="text-secondary text-start">Placed on {orderWeekDay(orderDetails?.date_added)}, {orderDetails?.date_added}</div>
    <div className="d-flex col-8">
    
<div className="flex-shrink-0">

<Image src={items.image} width="150px" height="200px"  className="" />
</div>
<div className="flex-grow-1 ms-1">
<div className="d-flex flex-column ">
     <div className="text-secondary ms-2 my-2 fs-5 text-start ">{items.title}</div>
    <div className="text-secondary ms-2 my-2 fs-5  text-start ">Qty:{items.quantity}</div> 
    <div className=" text-secondary ms-2 my-2 text-start fs-5 ">{state.currency}{items.price}</div> 
    
    
     
     
     
     </div>
</div>
</div>
<div className="col-4">
<div className="p-2">

<Button  variant="dark" size="sm" className="rounded-1 px-5 py-2" onClick={() => dispatch(fetchAddCart(items))}> 
<a  className="text-light text-decoration-none"> BUY AGAIN</a>
  </Button>
</div>
</div>
   
   
     
     </Row>
     )
})}
 
   
   </Row>
   </div>) : (<div>No Orders Found!</div>)}
  


  </Col></div>
  

      
      </Container >
  </div>
  )
}

export default OrderDetails;