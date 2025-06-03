
import {  Row,  } from "react-bootstrap"
import Nextrrow from "./Nextrrow";
import Previosarrow from "./Previosarrow";
import Slider from "react-slick"
import '../Home.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppDispatch, useAppSelector } from "../../../redux/app/hook";
import { fetchTrending, getTrending } from "../../../redux/features/items/itemSlice";
import { useEffect } from "react";

import { ITEM } from "../../../utils/@types";


import Product from "./Product";

const TrendingProduct = () => {
  const dispatch = useAppDispatch()
 
 
  useEffect(() =>{
    dispatch(fetchTrending())
    
      }, [dispatch])
  const settings = {
    infinite: false,
    speed: 0,
    nextArrow:<Nextrrow className={undefined} style={undefined} onClick={undefined} />,
    prevArrow:<Previosarrow className={undefined} style={undefined} onClick={undefined} />,
    initialSlide: 0,
    // slidesToShow: screenType === "MOBILE" ? 2 : 5,
    // slidesToScroll: screenType === "MOBILE" ? 2 : 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
          infinite: true,
          
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  const trending = useAppSelector(getTrending)
    console.log(trending)
    
  return (
             
    <Row  className='mx-3 ' >
      {trending && trending.length > 0  ? (<div> <div>
      <div className="d-inline-flex p-2 fs-4 border-info  border-bottom">Hot Trending Product</div>
    </div>
    <div  className="slider-container ">
    <Slider   {...settings}>  
     
  
        
    
  {trending?.map((product:ITEM )=> <Product  product={product} />  )}
    

</Slider>
 </div></div>): (<div className="fs-4 my-2 text-center"></div>)}
     
 </Row>
  )
}

export default TrendingProduct;