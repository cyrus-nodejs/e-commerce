
import { Col, Row,Button, Container} from "react-bootstrap"
import Navbar from "../components/Navbar/Navbar"
import "../index.css"
import { ITEM } from "../utils/@types";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useParams } from "react-router-dom";

import RelatedItems from "./RelatedProducts";
import Recentlyviewed from "./Recentlyviewed";

import { useAppDispatch, useAppSelector } from "../redux/app/hook"
import { fetchAddCart } from "../redux/features/cart/cartSlice";
import { fetchAsyncUser, getIsAuthenticated, getAuthUser } from '../redux/features/auth/authSlice';
import {  useEffect, useContext  } from "react";
import { FavoriteContext } from "../../src/Context/wishlist";
import { fetchProductDetails, getProductDetails } from "../redux/features/items/itemSlice";
// import CustomerViewed from "./CustomerViewed";
const Productdetails = () => {

  const dispatch = useAppDispatch()
const productDetails = useAppSelector(getProductDetails)
const {state} = useContext(FavoriteContext)
const authUser = useAppSelector(getAuthUser)
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
    <Container className='home' fluid>
    < Navbar />
    <Row style={{margin:"20px 20px"}} >
    
    {productDetails?.map((product:ITEM )=> 
    <div>
      <Row  style={{ margin:"20px"}} >
    
      <Col  sm={6} className='px-5' >
    <LazyLoadImage effect="blur" style={{ width: '100%', height: 'auto' }}  width='300px' height='400px' src={product.image} />
    </Col>
      <Col  sm={6} className=""   >
      <div className="fs-4 fw-normal d-inline-flex  text-dark">{product.title}</div>
      <div className="fs-4 fw-normal d-inline-flex  ">Category:{product.category}</div>
      <div className="fs-6 text-danger fw-normal  ">Discount:  {product.discount === 0 ? (<span className="  fw-bold rounded-1 px-2  ">Nil</span>) : ((<span className="top-left  fw-bold rounded-1 px-2 text-dark ">{product.discount}%</span>))}</div>
      <div className='text-dark fs-4'    >
      {state.currency}{product.price}
        </div>
        <Button variant="dark"   onClick={() => (fetchAddCart(product))} >Add to Cart </Button>  
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
      {authUser && isAuthenticated && (<Recentlyviewed />)}
 
      </Row>
    </Container> 
  )
}

export default Productdetails