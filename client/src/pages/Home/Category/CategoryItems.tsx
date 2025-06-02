
import "../../../index.css"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
 import{Row, Col,  Container, } from 'react-bootstrap';
import { Link } from "react-router-dom";

import Navbar from '../../../components/Navbar/Navbar';
import {  useEffect, useContext  } from "react";
import { FavoriteContext } from "../../../Context/wishlist";

import { useAppDispatch, useAppSelector } from '../../../redux/app/hook';
import { fetchCategoryItems, getCategoryItems} from '../../../redux/features/items/itemSlice';


import {  getIsAuthenticated, getAuthUser } from '../../../redux/features/auth/authSlice';
import Recentlyviewed from '../../Recentlyviewed';
import { useParams } from "react-router-dom";
import { ITEM } from '../../../utils/@types';


const Category = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(getAuthUser)
  const categoryItems = useAppSelector(getCategoryItems)
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  
  const {state} = useContext(FavoriteContext)
  const { id } = useParams();

    useEffect(() =>{
  dispatch(fetchCategoryItems(id))
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    


    return (
        <section className="" style={{background:""}}>
        <Container className='home' fluid>
        
        <Navbar />

         
            <Row className=" " style={{borderRadius:"5px", marginTop:"", background:"", color:'black', justifyContent:""}}><p className="fs-3 fw-normal sb   text-center" >{id} Deals</p></Row>
      <Row>
        {categoryItems && (   categoryItems?.map((item:ITEM )=> 
        <Col  key={item._id} style={{}}>
           <Link to={`/product/${item._id}`}  className=" text-decoration-none text-reset"> 
           <LazyLoadImage   width="130px" height="130px"   effect="blur"  src={item.image} />
                   <div className="d-flex flex-column ">
        <div className="fs-6   text-primary fw-medium ">{item.title.substring(0, 10) + ".."}</div>
        <div className="fs-6   text-dark  " >
         {state.currency}{item.price}
        </div>
        </div>
        </Link>
   
    </Col>
     ))}
   
      </Row>
          {user && isAuthenticated && (<Recentlyviewed />)}
          
        </Container>
            </section>
  )
}

export default Category