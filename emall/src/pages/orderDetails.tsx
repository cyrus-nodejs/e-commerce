
import { Col, Row,Button, Container, Image} from "react-bootstrap"
import Navbar from "../components/Navbar/Navbar"
// import { useContext  } from "react";
import axios from "axios"
// import { CartContext } from "../Context/cart";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {  ORDERITEM} from "../utils/@types";
const OrderDetails = () => {
    // const {addToCart} = useContext(CartContext)
    
    const [orderItems, setOrderItems] = useState([])
    const [bills, setBills] = useState("")
   const [date, setDate] = useState("")
   const [orderId, setOrderId]  = useState("")
   const [payment, setPayment]  = useState("")
   const [delivery, setDelivery]  = useState("")
     
   const newDate = new Date(date)
   console.log(newDate)
   const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const orderday = weekday[newDate.getDay()]
   
     const { id }  = useParams()
    
     const handleOrderDetails = async () => {
    
        try {
          const { data } = await axios.get(
            `http://localhost:3000/orderdetails/${id}`,
            {withCredentials: true}
          );
          
          const { success, message, order } = data;
    
          if (success) {
            console.log(order)
            setOrderItems(order.items)
            setBills(order.bill)
            setDate(order.date_added)
            setOrderId(order._id)
            setDelivery(order.delivered)
            setPayment(order.payment)
            alert(message)
            alert(order)
          } else {
            console.log(message);
          
           
          }
        } catch (error) {
          console.log(error)
        }
        
      
        
    
      
    
      }
      useEffect(() =>{
        handleOrderDetails();
        
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [])
          
          console.log(bills)
  return (
    <div>
    <Navbar />
    <Container >
    
      <Col >
  
    
      <div className="text-dark text-start my-3 fs-4">Order Details</div>
     <Row  className=" my-2" >

      <div className="d-flex align-items-start flex-column border border-start-0 border-end-0 " >
     
<div className="mb-auto p-2   ">

<div className="text-dark fs-5">Order Id: {orderId}</div>
      <div className='text-black'> {orderItems.length} items</div>
      <div className='text-black'>Placed on  {date.slice(0, 10)}</div>
<div className="text-dark">Total: ${bills}</div>
<div className="text-dark">Payment: {payment? "Successful!" : "Pending" }</div>
<div className="text-dark">Delivery: {delivery ? "Completed" : "Pending"}</div>
</div>
</div>
<div className="text-dark fs-5 my-3 text-start">ITEMS IN YOUR ORDER</div>
        {orderItems.map((items:ORDERITEM) =>{
     return (
       <Row  className="border rounded-2 my-2" >
        <div className="text-dark text-start fs-4">Payment: {payment? "Successful!" : "Pending" }</div>
        <div className="text-secondary text-start">Placed on {orderday}, {date.slice(0,10)}</div>
        <div className="d-flex col-8">
        
  <div className="flex-shrink-0">
 
  <Image src={`http://localhost:3000/items/${items.image}`} width="150px" height="200px"  className="" />
  </div>
  <div className="flex-grow-1 ms-1">
  <div className="d-flex flex-column ">
         <div className="text-secondary ms-2 my-2 fs-5 text-start ">{items.title}</div>
        <div className="text-secondary ms-2 my-2 fs-5  text-start ">Qty:{items.quantity}</div> 
        <div className=" text-secondary ms-2 my-2 text-start fs-5 ">${items.price}</div> 
        
        
         
         
         
         </div>
  </div>
</div>
<div className="col-4">
<div className="p-2">

   <Button  variant="dark" size="sm" className="rounded-1 px-5 py-2" > 
  <a  href="/" className="text-light text-decoration-none"> BUY AGAIN</a>
      </Button>
  </div>
</div>
       
       
         
         </Row>
         )
  })}
     
       
       </Row>
       


      </Col>
      </Container >
  </div>
  )
}

export default OrderDetails;