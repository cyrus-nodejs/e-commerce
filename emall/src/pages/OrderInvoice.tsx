 /* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {Container,     Button,   } from "react-bootstrap"
import { OrderContext } from "../Context/order"
import { CheckoutContext } from "../Context/checkout"
import "../index.css"
import { Link } from "react-router-dom"
import   {useContext} from 'react'
import Navbar from "../components/Navbar/Navbar"


const OrderInvoice = () => {
const { existingOrder} = useContext(OrderContext)
const {getsecret} = useContext(CheckoutContext)



// const newDate = new Date(date)
// console.log(newDate)
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
//  const orderday = weekday[newDate.getDay()]


return (
    <section>
        <Navbar />
    <Container >
  
        {existingOrder.map((order) => {
        
          return (
             
            <div className="p-3">
            {order ? (<div className="">
              <div class=" text-dark text-start fs-4">ORDER INVOICE</div>
              <div className=" ">
              <div class="d-flex col-8 align-items-start border border-secondary border-end-0 border-start-0 flex-column me-2 ">
  <div class="p-1 text-dark fs-5">Order No: {"****" +order._id.substring(0, 4) + "******"}</div>
  <div class=" fs-6 text-dark">Placed on On: { weekday[new Date(order.date_added).getDay()]}, {order.date_added.slice(0,10)}</div>
  <div class="p-1 fs-6 text-dark">Number of items :{order.items.length}</div>
  <div class="p-1 fs-6 text-dark">Gift wrapper :${order.giftwrapper}</div>
  <div class="p-1 fs-6 text-dark">Delivery Fee :${order.deliveryfee}</div>
  <div class="p-1 fs-6 text-dark">Total: ${order.bill}</div>
  <div class="p-1 fs-5 text-dark">Payment: {order.payment ? "Payment Successful!" : "Pending" }</div>
  <div class="p-1 fs-6 text-dark"><div className="text-dark">Delivery: {order.delivery ? "Deivery Completed" : "Pending"}</div> </div>
</div>
<div className="d-flex">
<div className="p-2 ">
{!order.payment && (<Button variant="dark" className="shadow-none rounded-1" size="lg" type="submit" onClick={getsecret}  >
<Link to="/payment" className="text-decoration-none text-light">
 CONFIRM ORDER
 </Link>
</Button>)}


{order.payment && ( 
<Button className="d-flex align-items-end"  variant="dark" size="sm" >
<a  href={`/orderdetails/${order._id}`} className=" text-decoration-none text-reset">SEE DETAILS</a>
</Button>


)}
</div>
</div>
</div>



</div>
          ) : (<div className="fs-1 text-dark">No Order Exist</div>)}
              
   
     
 
        
         </div>
  )
})}

    
       
      
       
    </Container>
    </section>
  )
}

export default OrderInvoice;