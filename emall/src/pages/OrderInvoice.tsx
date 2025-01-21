
import {Container,     Button,   } from "react-bootstrap"


import "../index.css"
import {  useEffect, useContext  } from "react";
import { FavoriteContext } from "../../src/Context/wishlist";

import Navbar from "../components/Navbar/Navbar"
import { useAppDispatch, useAppSelector } from "../redux/app/hook"

import { fetchAsyncUser, getIsAuthenticated, getAuthUser } from '../redux/features/auth/authSlice';

import { fetchCurrentOrder, getCurrentOrder } from "../redux/features/order/orderSlice";

const OrderInvoice = () => {

const {state} = useContext(FavoriteContext)

const dispatch = useAppDispatch()
const currentOrder = useAppSelector(getCurrentOrder)

const user = useAppSelector(getAuthUser)
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  


const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

useEffect(() =>{
  dispatch(fetchAsyncUser())
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    useEffect(() =>{
      dispatch(fetchCurrentOrder())
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [dispatch])
    

return (
    <section>
        <Navbar />
    <Container >
  
    
             {isAuthenticated && user ? (<div className="p-3">
            {currentOrder ? (<div className="">
              <div className=" text-dark text-start fs-4">ORDER INVOICE</div>
              <div className=" ">
              <div className="d-flex col-8 align-items-start border border-secondary border-end-0 border-start-0 flex-column me-2 ">
  <div className="p-1 text-dark fs-5">Order No: {"****" +currentOrder._id.substring(0, 4) + "******"}</div>
  <div className=" fs-6 text-dark">Placed on On: { weekday[new Date(currentOrder.date_added).getDay()]}, {currentOrder.date_added.slice(0,10)}</div>
  <div className="p-1 fs-6 text-dark">Number of items :{currentOrder.items.length}</div>
  <div className="p-1 fs-6 text-dark">Gift wrapper :{state.currency}{currentOrder.giftwrapper}</div>
  <div className="p-1 fs-6 text-dark">Delivery Fee :{state.currency}{currentOrder.deliveryfee}</div>
  <div className="p-1 fs-6 text-dark">Total: {state.currency}{currentOrder.bill}</div>
  <div className="p-1 fs-5 text-dark">Payment: {currentOrder.payment ? "Payment Successful!" : "Pending" }</div>
  <div className="p-1 fs-6 text-dark"><div className="text-dark">Delivery: {currentOrder.delivered ? "Deivery Completed" : "Pending"}</div> </div>
</div>
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



</div>
          ) : (<div className="fs-1 text-dark">No Order Exist</div>)}
              
   
     
 
        
         </div>) : (<div>Please Login to view currentOrder</div>)}
            
 
    
       
      
       
    </Container>
    </section>
  )
}

export default OrderInvoice;