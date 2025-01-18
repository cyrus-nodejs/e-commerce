

 
 import{Row, Col, Image, Container, } from 'react-bootstrap';
import { Link } from "react-router-dom";

import Navbar from '../components/Navbar/Navbar';

import {   useEffect } from 'react'
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
        <Container fluid>
        
        <Navbar />

            <Row className="p-2  " style={{borderRadius:"5px", marginTop:"", background:"", color:'black', justifyContent:""}}><p className="fs-3 fw-normal sb   text-center" >{id} Deals</p></Row>
      {categoryDetails?.map((item:ITEM )=> 
        <Row  key={item._id} style={{width: '11.5rem', display:"inline-flex", height:"15rem", margin:"10px"}}>
               
           <Col  className="frame"  style={{border:"1px solid white", borderRadius:"10px", width:"11rem", height:"15rem", backgroundColor:"#FFFFFF",}}       >
           <center>
           <Link to={`/product/${item.title}`} onClick={() =>{dispatch(fetchAddRecentlyViewed(item))}} className="p-2 text-decoration-none text-reset"> 
           <Image  style={{width:'8rem', height:"10rem" }}  rounded src={item.image} />
        <p className="fs-6  tfont  ">{item.title.substring(0, 10) + ".."}</p>
        <p className="fs-6 fw-bold  text-danger  " >
         ${item.price}
        </p>
        </Link>
        </center>
    </Col>
    </Row>
     )}
      
          {user && isAuthenticated && (<Recentlyviewed />)}
          
        </Container>
            </section>
  )
}

export default Category