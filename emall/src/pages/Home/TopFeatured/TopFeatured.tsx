 
import { Row, Col } from "react-bootstrap"
import SliderFeatured from "./SliderFeatured";
import GalleryFeatured from "./GalleryFeatured";
import { useEffect } from "react";
import {   useAppDispatch } from "../../../redux/app/hook";
import {fetchTopFeaturedGallery, fetchTopFeaturedSlide, } from "../../../redux/features/items/itemSlice";
const TopFeatured = () => {
   const dispatch =useAppDispatch()
  
  useEffect(() =>{
    dispatch(fetchTopFeaturedGallery())
    
      }, [dispatch])
      useEffect(() =>{
    dispatch(fetchTopFeaturedSlide())
    
      }, [dispatch])
  return (
    <Row my-3>
      <div className="mb-3">
      <div className="d-inline-flex p-2 fs-4 border-info  border-bottom">Top Featured Products</div>
    </div>
       
      <Col sm={5}><SliderFeatured /></Col>
      <Col sm={7}><GalleryFeatured /></Col>

    </Row>
  )
}

export default TopFeatured;