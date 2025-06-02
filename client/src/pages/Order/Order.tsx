
import {Container, Table} from "react-bootstrap"
// import {Container, Col, Row, Button,  Image,  } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from '../../redux/app/hook';
import { ITEM} from "../../utils/@types";
import "../../index.css"
import { Link } from "react-router-dom";
// import { fetchAddCart } from "../../redux/features/cart/cartSlice";


import {  useEffect } from "react";
// import { FavoriteContext } from "../../Context/wishlist";
import { fetchAllOrders, getAllOrder } from "../../redux/features/order/orderSlice";
// import { CartContext } from "../Context/cart"
import Navbar from "../../components/Navbar/Navbar"


const Order = () => {
const dispatch = useAppDispatch()
const allOrders = useAppSelector(getAllOrder)
console.log(allOrders)


  
useEffect(() =>{
 
  dispatch(fetchAllOrders())
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])


// Simple inline styles for demo


  return (
  
    <div>
      <Navbar />
      <Container className='home ' fluid >
  

<h2 className='text-center'>My Orders</h2>

<div className="py-3">
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
        
      
        
        </Container >
    </div>
  )
}

export default Order