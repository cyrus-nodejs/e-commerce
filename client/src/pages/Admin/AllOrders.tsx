import { fetchAdminAllOrders, getAdminAllOrders } from "../../redux/features/admin/adminSlice"

import { useAppSelector, useAppDispatch } from "../../redux/app/hook"
import { useEffect,  } from "react"

import { Spinner, Table,   Row, } from "react-bootstrap"
import { Link } from "react-router-dom"
import {  ITEM } from "../../utils/@types"




const AllOrders = () => {
   
const dispatch = useAppDispatch()
const allOrders = useAppSelector(getAdminAllOrders)
// const isAuthenticated = useAppSelector(getIsAuthenticated)
// const authUser = useAppSelector(getAuthUser)
 

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

  


  <Table className='' >
    <thead>
      <tr>
        <th >Order ID</th>
        <th >Date</th>
        <th >Total</th>
        <th >Delivered</th>
        <th >Items</th>
        <th></th>
      </tr>
    </thead>
    <tbody>

      {  allOrders?.map((order) => (
       
        <tr  >
          
          <td className='text-black' >{order._id}</td>
          <td >{new Date(order.createdAt).toLocaleDateString()}</td>
          <td >${order.bill.toFixed(2)}</td>
          <td >
            {order.isDelivered
              ? new Date(order.deliveredAt).toLocaleDateString()
              : 'No'}
          </td>
          <td >
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {order.items.map((item:ITEM) => (
                <li key={item._id}>
                  {item.title || 'Deleted Product'} × {item.quantity}
                </li>
              ))}
            </ul>
          </td>
           <td >
           <Link to={`/orderdetails/${order._id}`} className='text-decoration-none text-reset'>View details</Link> 
          </td>
        </tr>
      ))}
    </tbody>
  </Table>

</div>

    </div>):(<div className="fs-4 text-center"><Spinner animation="border" variant="primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner> <p className="fs-4 text-center">Refresh Page</p> </div>)}
   
   
   
  
</Row>
  )
}

export default AllOrders