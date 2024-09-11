
import {Container, Col, Row, Button,  Image,  } from "react-bootstrap"
import {  useContext } from "react"
import { OrderContext } from "../Context/order"

// import { CartContext } from "../Context/cart"
import Navbar from "../components/Navbar/Navbar"
import { ORDER , ORDERITEM} from "../utils/@types"
const Order = () => {
const {Order, orderItems} = useContext(OrderContext)
// const {addToCart} = useContext(CartContext)
console.log(Order)
  return (
  
    <div>
      <Navbar />
      <Container >
      
        <Col >
       
        { Order.map((item:ORDER) =>{
     return (
       <Row  className="border border rounded-2 my-4" >
        {item ? ( <div>  <div className="d-flex align-items-start flex-column col-12 border  border-end-0 border-start-0" >
  <div className="mb-auto p-2   ">
  <div className="text-dark ms-1 text-start fs-5">Order Id: {item._id}</div>
        <div className='text-black ms-1 text-start fs-5'> {item.items.length} items</div>
        <div className='text-black ms-1 text-start fs-5'>Placed on {item.date_added.slice(0,10)}</div>
<div className="text-dark ms-1 text-start fs-5">Total: ${item.bill}</div>
<div className="text-dark ms-1 text-start fs-5">Payment: {item.payment ? "Successful!" : "Pending" }</div>
<div className="text-dark ms-1 text-start fs-5">Delivery: {item.delivered ? "Completed" : "Pending"}</div>
</div>
  </div>
  <div className="row">
  <div className="text-secondary text-start fs-5 ">Date: {item.date_added.slice(0,10)}</div> 
  <div className="col-7">
  { orderItems.map((item:ORDERITEM) =>{
    return (
        <div className="d-flex ">
     
  <div className="flex-shrink-0">
  <Image src={`http://localhost:3000/items/${item.image}`} width="150px" height="200px"  className="rounded-2" />
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
})}
</div>
<div className="col-4">
<div className="">
{/* <div className="p-2">
  <Button  variant="dark" size="sm" className="rounded-1 px-5 py-2" onClick={() => addToCart(item:ORDER)}>
  <a  className="text-light text-decoration-none"> BUY AGAIN</a>
      </Button>
    
  </div> */}
  <div className="p-2">
  <Button  variant="dark" size="sm" className="rounded-1 px-5 py-2" >
  <a  href={`/orderdetails/${item._id}`} className="p-2 text-decoration-none text-reset">SEE DETAILS</a>
      </Button>
  </div>
</div>
</div>
</div>
</div>   
       ) 
        :
         (<div className="fs-1">No Orders exist</div>) 
        }
     
         
         </Row>
         )
  })}

        </Col>
        </Container >
    </div>
  )
}

export default Order