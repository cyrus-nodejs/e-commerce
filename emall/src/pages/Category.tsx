
import "../index.css"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
 import{Row, Col,  Container, } from 'react-bootstrap';
import { Link } from "react-router-dom";

import Navbar from '../components/Navbar/Navbar';
import {  useEffect, useContext  } from "react";
import { FavoriteContext } from "../../src/Context/wishlist";

import { useAppDispatch, useAppSelector } from '../redux/app/hook';
import { fetchCategoryDetails, getCategoryDetails } from '../redux/features/items/itemSlice';
import { fetchAddRecentlyViewed} from '../redux/features/items/itemSlice';

import { fetchAsyncUser, getIsAuthenticated, getAuthUser } from '../redux/features/auth/authSlice';
import Recentlyviewed from './Recentlyviewed';
import { useParams } from "react-router-dom";
import { ITEM } from '../utils/@types';


const Category = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(getAuthUser)
  const categoryDetails = useAppSelector(getCategoryDetails)
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  
  const {state} = useContext(FavoriteContext)
  const { id } = useParams();

    useEffect(() =>{
  dispatch(fetchCategoryDetails(id))
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    
    useEffect(() =>{
      dispatch(fetchAsyncUser())
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [dispatch])
    

    return (
        <section className="" style={{background:""}}>
        <Container className='home' fluid>
        
        <Navbar />

         
            <Row className="p-2  " style={{borderRadius:"5px", marginTop:"", background:"", color:'black', justifyContent:""}}><p className="fs-3 fw-normal sb   text-center" >{id} Deals</p></Row>
      <Row>
      {categoryDetails?.map((item:ITEM )=> 
        <Col  key={item._id} style={{}}>
               
           <Link to={`/product/${item.title}`} onClick={() =>{dispatch(fetchAddRecentlyViewed(item))}} className="p-2 text-decoration-none text-reset"> 
           <LazyLoadImage   width="150px" height="200px"   effect="blur"  src={item.image} />
        <p className="fs-6  tfont  ">{item.title.substring(0, 10) + ".."}</p>
        <p className="fs-6 fw-bold  text-danger  " >
         {state.currency}{item.price}
        </p>
        </Link>
   
    </Col>
     )}
      </Row>
          {user && isAuthenticated && (<Recentlyviewed />)}
          
        </Container>
            </section>
  )
}

export default Category