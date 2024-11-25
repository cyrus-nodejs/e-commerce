
import { Row, Image, Col } from "react-bootstrap";
import '../Home.css'
import {  useEffect  } from "react";

import { Link } from "react-router-dom";
import { ITEM } from "../../../utils/@types";

  import { useAppDispatch, useAppSelector } from "../../../redux/app/hook";
  import {fetchAddRelated, fetchAddRecentlyViewed, fetchTopFeaturedGallery, getTopFeaturedGallery } from "../../../redux/features/items/itemSlice";
const GalleryFeatured = () => {
  const dispatch = useAppDispatch()
  const topFeaturedGallery = useAppSelector(getTopFeaturedGallery)

    useEffect(() =>{
      dispatch(fetchTopFeaturedGallery())
      
        }, [dispatch])
       
  return (
    <Row className="d-flex " >
     
{topFeaturedGallery?.map((item:ITEM, id) =>{
   return (
    
        <Col key={id} className="flex-fill  " sm={6} md={4} lg={3} style={{margin:"5px",   }} >
            <Row className="bg-white rounded-3 position-relative" >
              
      <Col sm={5} className=" bg-white  " style={{width:"",height:""}} ><Image src={item.image} loading="lazy" fluid   className="" /></Col>
      <Col sm={6} className="bg-white ">
      <Link onClick={() =>{ dispatch(fetchAddRecentlyViewed(item)); dispatch(fetchAddRelated(item));   }}  to={`/product/${item.title}`} className="p-2 text-decoration-none text-reset">
        <div className="d-flex flex-column mb-3">
      <div className="text-primary fw-medium ">{item.title.substring(0, 18)}</div>
            {/* <div className="d-inline-flex gap-1 text-dark fs-6">{item.rasting}</div> */}
            <div className="d-flex">
  {/* <div className="p-2 flex-fill fw-medium">${item.newprice} <span className="ms-1 text-decoration-line-through text-secondary">{item.price}</span></div> */}
  <div className="p-2 flex-fill text-danger fs-5 fw-medium">${item.newprice}<span className="text-secondary mx-2 fw-normal text-secondary text-decoration-line-through">${item.price}</span></div>
</div> 
 {item.discount && (<div className="top-left  fw-bold rounded-1 px-2 text-light bg-success">{item.discount}%</div>)}
            
            
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

