
import { Col, Row,Button, Container, Image} from "react-bootstrap"
import Navbar from "../components/Navbar/Navbar"

import { ITEM } from "../utils/@types";

import { useParams } from "react-router-dom";

import RelatedItems from "./RelatedProducts";
import Recentlyviewed from "./Recentlyviewed";
import { useAppDispatch, useAppSelector } from "../redux/app/hook"
import { fetchAddCart } from "../redux/features/cart/cartSlice";
import { fetchAsyncUser, getIsAuthenticated, getAuthUser } from '../redux/features/auth/authSlice';
import { useEffect } from "react";
import { fetchProductDetails, getProductDetails } from "../redux/features/items/itemSlice";
// import CustomerViewed from "./CustomerViewed";
const Productdetails = () => {

  const dispatch = useAppDispatch()
const productDetails = useAppSelector(getProductDetails)

const user = useAppSelector(getAuthUser)
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  

 
    
    
    
     

     const { id } = useParams()
     
     useEffect(() =>{
      dispatch(fetchAsyncUser())
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [dispatch])
    
      useEffect(() =>{
        dispatch(fetchProductDetails(id));
        
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [])
          
          
  
          
       
  return (
    <Container fluid>
    < Navbar />
    <Row style={{margin:"20px 20px"}} >
    
    {productDetails?.map((product:ITEM )=> 
    <div>
      <Row  style={{ margin:"20px"}} >
    
      <Col  >
    <Image   fluid  src={product.image} />
    </Col>
      <Col className=""   >
      <div className="fs-4 fw-normal d-inline-flex  text-dark">{product.title}</div>
      <div className="fs-4 fw-normal d-inline-flex  ">Category:{product.category}</div>
      <div className="fs-6 text-danger fw-normal  ">Discount: {product.discount ? (product.discount) :(0)}%</div>
      <div className='text-dark fs-4'    >
      ${product.newprice}<span className="text-secondary mx-2 text-decoration-line-through">{product.discount && (product.price)}</span>
        </div>
      
     
        
        

        <Row className="d-flex">
      <div className="p-2">
       <Button variant="dark"   onClick={() => (fetchAddCart(product))} >Add to Cart </Button> 
       </div>
    </Row>
      
      </Col>
      <div className='fs-6  my-5'>
        <div className="text-start border-bottom fs-3">Product Description</div>
      <div className='fs-6 mt-3 '>{product.description} </div>
      </div>
    
    </Row>
  
  <RelatedItems product={product} />
        </div>


    
         
      )}
      
      {/* <CustomerViewed /> */}
      {user && isAuthenticated && (<Recentlyviewed />)}
 
      </Row>
    </Container> 
  )
}

export default Productdetails