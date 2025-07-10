
import { Col, Row,Button,  ListGroup, Container} from "react-bootstrap"
import Navbar from "../../components/Navbar/Navbar"
import "../../index.css"
import Footer from "../../components/Footer";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useParams } from "react-router-dom";
import ProductScreen from "./ProductScreen";
import RelatedItems from "../RelatedProducts";
import Recentlyviewed from "../Recentlyviewed";
import Rating from "./Rating/RatingIcon";
import { useAppDispatch, useAppSelector } from "../../redux/app/hook"
import { fetchAddCart } from "../../redux/features/cart/cartSlice";
import { fetchAsyncUser, getIsAuthenticated, getAuthUser } from '../../redux/features/auth/authSlice';
import {  useEffect, useContext  } from "react";
import { FavoriteContext } from "../../Context/wishlist";
import { fetchProductDetails, getProductDetails } from "../../redux/features/items/itemSlice";
// import CustomerViewed from "./CustomerViewed";
// import NavSearchResults from "../../../components/Navbar/NavSearch/NavSearchResults"
import { getSearchTerm } from "../../redux/features/items/itemSlice"
import NavSearchResults  from "../../components/Navbar/NavSearch/NavSearchResults"

const Productdetails = () => {

  const dispatch = useAppDispatch()
const product = useAppSelector(getProductDetails)
const searchTerm = useAppSelector(getSearchTerm)
const {state} = useContext(FavoriteContext)
const authUser = useAppSelector(getAuthUser)
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  
console.log(product)
 
    
    
    
     

     const { id } = useParams()
     const productId = id
     useEffect(() =>{
      dispatch(fetchAsyncUser())
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [dispatch])
    
      useEffect(() =>{
        dispatch(fetchProductDetails(id));
        
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [])
          
          
  console.log(product)
          
       
  return (
    <Container className='home' fluid>
    < Navbar />
    {!searchTerm ? (<Row style={{margin:"20px 20px"}} >
    

    <div>
      <Row  style={{ margin:"20px"}} >
    
      <Col  sm={6} className='px-5' >
    <LazyLoadImage effect="blur" style={{ width: '250px', height: '300px' }}   src={product?.image} />
    </Col>
      <Col  sm={6} className=""   >
      <div className="fs-4 fw-normal   text-primary">{product?.title}</div>
      <div className="fs-4 fw-normal d-inline-flex  ">Category:{product?.category}</div>
      <div className="fs-6    ">Discount:  {!product?.discount ? (<span className="text-dark  fw-bold rounded-1 px-2  ">0%</span>) : ((<span className="top-left  fw-bold rounded-1 px-2 text-dark ">{product?.discount}%</span>))}</div>
      <div className='text-dark fs-4'    >Price:
      {state.currency}{product?.price}
        </div>
        <Button variant="dark"   onClick={() => dispatch(fetchAddCart(product))} >Add to Cart </Button>  
      </Col>
      <div className='fs-6  my-5'>
        <div className="text-start border-bottom fs-3">Product Description</div>
      <div className='fs-6 mt-3 '>{product?.description} </div>
      </div>
    
   
    </Row>
  <Row>
    <h5 className='text-dark'>Comments from Verified Purchases({product?.reviews?.length})</h5>
    {product?.reviews?.map((review) => (
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <div><Rating value={review.rating} text={`${product.numReviews} reviews`} /></div>
              <p>{review.comment}</p>
              <p>{review.createdAt.substring(0, 10)}</p>
            </ListGroup.Item>
          ))}

<ProductScreen productId={productId} />
  </Row>
  
  <RelatedItems products={product} />
        </div>


    
         
      
      
      {/* <CustomerViewed /> */}
      {authUser && isAuthenticated && (<Recentlyviewed />)}
 <Footer />
      </Row>) : (<div>
        <NavSearchResults />
      </div>)}
    
    </Container> 
  )
}

export default Productdetails