
import { Col, Row,  ListGroup,Card, Container, Image} from "react-bootstrap"
import Navbar from "../../components/Navbar/Navbar"
import { ITEM } from "../../utils/@types";

import  "../../index.css"
import { useParams } from "react-router-dom";


// import { fetchAddCart } from "../../redux/features/cart/cartSlice";

import { fetchOrderDetails, getOrderDetails,  } from "../../redux/features/order/orderSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
import {  useEffect  } from "react";
// import { FavoriteContext } from "../../Context/wishlist";
const OrderDetails = () => {
    const dispatch = useAppDispatch()
    // const isAuthenticated = useAppSelector(getIsAuthenticated)
    // const user = useAppSelector(getAuthUser)
  const orderDetails = useAppSelector(getOrderDetails)
  // const orderDetailsItems =  useAppSelector(getOrderDetailsItems) 
// const {state} = useContext(FavoriteContext)
 
      useEffect(() =>{
        dispatch(fetchOrderDetails())
        
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [dispatch])
      
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     const getWeekDay= (date: any) =>{
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
    <Container className='home pb-5' >

  
    {orderDetails ? (<div>
   
   <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name:</strong> {orderDetails.owner?.firstname}</p>
              <p><strong>Email:</strong> {orderDetails.owner?.email}</p>
              
                <strong>Address:</strong>
                {orderDetails.address}
              {orderDetails.isDelivered ? (
                <p className="text-success">Delivered at {getWeekDay(orderDetails.deliveredAt)}, {orderDetails.deliveredAt.slice(0,10)}</p>
              ) : (
                <p className="text-danger">Not Delivered</p>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p><strong>Method:</strong> Card</p>
              {orderDetails.payment ? (
                <p className="text-success">Paid at {orderDetails?.updatedAt.slice(0,10)}</p>
              ) : (
                <p className="text-danger">Not Paid</p>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderDetails.items.length === 0 ? (
                <p>Order is empty</p>
              ) : (
                <ListGroup variant="flush">
                  {orderDetails.items.map((item:ITEM, index:number) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.image} fluid rounded />
                        </Col>
                        <Col>
                          {item.title}
                        </Col>
                        <Col md={4}>
                          {item.unit} x ${item.price} = ${item.unit * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${orderDetails.items[0].price}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${orderDetails.deliveryfee}</Col>
                </Row>
                
                <Row>
                  <Col>Total</Col>
                  <Col>${orderDetails.bill}</Col>
                </Row>
              </ListGroup.Item>
              {/* Optional: payment or deliver button for admin */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
   </div>) : (<div>No Orders Found!</div>)}
  


  
  

      
      </Container >
  </div>
  )
}

export default OrderDetails;