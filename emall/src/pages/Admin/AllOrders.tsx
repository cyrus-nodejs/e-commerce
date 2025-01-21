import { fetchAdminAllOrders, getAdminAllOrders } from "../../redux/features/admin/adminSlice"
import {   fetchAsyncUser } from "../../redux/features/auth/authSlice"
import { useAppSelector, useAppDispatch } from "../../redux/app/hook"
import { useEffect, useContext } from "react"
import { FavoriteContext } from "../../Context/wishlist"
import { Spinner, Button,  Col,  Row, } from "react-bootstrap"

import { ORDER } from "../../utils/@types"




const AllOrders = () => {
    const {state} = useContext(FavoriteContext)
const dispatch = useAppDispatch()
const allOrders = useAppSelector(getAdminAllOrders)
// const isAuthenticated = useAppSelector(getIsAuthenticated)
// const authUser = useAppSelector(getAuthUser)
 
useEffect(() =>{
    dispatch(fetchAsyncUser())
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [dispatch])
  
      useEffect(() =>{
        dispatch(fetchAdminAllOrders())
        
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [dispatch])
      
  
  return (
    <Row  className='' >
    {allOrders && allOrders.length > 0  ? (<div>
      <div>
  <div className="d-inline-flex p-2 fs-4 border-info  border-bottom">All Orders</div>
</div>
    <div  className="row">

    <Col >
       {allOrders ? (<div>{ allOrders?.map((item:ORDER) =>{
     return (
       <Row  className="border border rounded-2 my-4" >
         <div>  <div className="d-flex align-items-start flex-column col-12 border  border-end-0 border-start-0" >
  <div className="mb-auto p-2   ">
  <div className="text-dark ms-1 text-start fs-5">Order Id: {item._id}</div>
        <div className='text-black ms-1 text-start fs-5'> {item.items.length} items</div>
        <div className='text-black ms-1 text-start fs-5'>Placed on {item.date_added.slice(0,10)}</div>
<div className="text-dark ms-1 text-start fs-5">Total: {state.currency}{item.bill}</div>
<div className="text-dark ms-1 text-start fs-5">Payment: {item.payment ? "Successful!" : "Pending" }</div>
<div className="text-dark ms-1 text-start fs-5">Delivery: {item.delivered ? "Completed" : "Pending"}</div>
</div>
  </div>
  <div className="row">
  <div className="text-secondary text-start fs-5 ">Date: {item.date_added.slice(0,10)}</div> 
  <div className="col-7">
  {/* { orderItems?.map((item:ITEM) =>{
    return (
        <div className="d-flex ">
     
  <div className="flex-shrink-0">
  <Image src={item.image} width="150px" height="200px"  className="rounded-2" />
  </div>
  <div className="flex-grow-1 ms-1">
  <div className="d-flex flex-column ">
         <div className="text-secondary ms-2 text-start ">{item.title}</div>
        <div className="text-secondary ms-2 text-start ">Quantity:{item.quantity}</div> 
        <div className=" text-secondary ms-12 text-start ">Price:${item.price}</div> 
        
        
         
         
         
         </div>
  </div>

</div>
  )
})} */}
</div>
<div className="col-4">
<div className="">


  </div> 
  <div className="p-2">
  <Button  variant="dark" size="sm" className="rounded-1 px-5 py-2" >
  <a  href={`/orderdetails/${item._id}`} className="p-2 text-decoration-none text-reset">SEE DETAILS</a>
      </Button>
  </div>
</div>
</div>
</div>
  
     
     
         
         </Row>
         )
  })}
</div>) : (<div className="fs-1 text-center">No Order Found!</div>) }

        
        </Col>
</div>

    </div>):(<div className="fs-4 text-center"><Spinner animation="border" variant="primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner> <p className="fs-4 text-center">Refresh Page</p> </div>)}
   
   
   
  
</Row>
  )
}

export default AllOrders