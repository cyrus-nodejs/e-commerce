import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Row,  Col } from "react-bootstrap";
import '../Home.css'
import {  useEffect, useContext  } from "react";
import { FavoriteContext } from "../../../Context/wishlist";
import { Link } from "react-router-dom";
import { ITEM } from "../../../utils/@types";
 
  import { useAppDispatch, useAppSelector } from "../../../redux/app/hook";
  import { fetchAddRecentlyViewed, fetchTopFeaturedGallery, getTopFeaturedGallery } from "../../../redux/features/items/itemSlice";
const GalleryFeatured = () => {
  const dispatch = useAppDispatch()
  const topFeaturedGallery = useAppSelector(getTopFeaturedGallery)
const {state} = useContext(FavoriteContext)
    useEffect(() =>{
      dispatch(fetchTopFeaturedGallery())
      
        }, [dispatch])
       
  return (
    <Row className="d-flex " >
     
{topFeaturedGallery?.map((item:ITEM, id) =>{
   return (
    
        <Col key={id} className="flex-fill d-none d-sm-block" xs={6} sm={6} md={4} lg={3} style={{margin:"5px",   }} >
            <Row className="bg-white rounded-3 position-relative" >
              
      <Col sm={5} className=" bg-white  " ><LazyLoadImage src={item.image}  style={{ width: '100%', height: 'auto' }}  effect="blur"   className="" /></Col>
      <Col sm={6} className="bg-white ">
      <Link onClick={() =>{ dispatch(fetchAddRecentlyViewed(item));    }}  to={`/product/${item.title}`} className="p-2 text-decoration-none text-reset">
        <div className="d-flex flex-column mb-3">
      <div className="text-primary fs-6 fw-medium ">{item.title.substring(0, 18)}</div>
            {/* <div className="d-inline-flex gap-1 text-dark fs-6">{item.rasting}</div> */}
            <div className="d-flex">
  {/* <div className="p-2 flex-fill fw-medium">${item.newprice} <span className="ms-1 text-decoration-line-through text-secondary">{item.price}</span></div> */}
  <div className="p-2 flex-fill text-danger fs-6 fw-medium">{state.currency}{item.price}</div>
</div> 
 {item.discount === 0 ? (<div className="top-left  fw-bold rounded-1 px-2 text-light bg-success"></div>) : ((<div className="top-left  fw-bold rounded-1 px-2 text-light bg-success">{item.discount}%</div>))}
            
            
            </div>
            </Link>
       </Col>
       </Row>
       </Col>
    
       )
})}
 
</Row>
   
  )
}

export default GalleryFeatured;

