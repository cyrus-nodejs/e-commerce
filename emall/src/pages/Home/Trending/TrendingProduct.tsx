import {  Row,  } from "react-bootstrap"
import Nextrrow from "./Nextrrow";
import Previosarrow from "./Previosarrow";
import Slider from "react-slick"
import '../Home.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ITEM } from "../../../utils/@types";


import Product from "./Product";
const TrendingProduct = () => {

  const [products, setProducts] = useState([])
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
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
 
    
    const handleTrending = () => {
    
      const config ={
        method:"get",
        url:`https://emall-server.onrender.com/trending`, 
        withCredentials: true, 
      }
    
      
      axios(config)
      .then(response=>{
      setProducts(response.data)
      })
      .catch(error => {
        alert(error)
      })
      
      }
       
      useEffect(() =>{
    handleTrending();
    
      }, [])
    
    
  return (
             
    <Row  className=' ' >
      <div>
      <div className="d-inline-flex p-2 fs-4 border-info  border-bottom">Hot Trending Product</div>
    </div>
    <div  className="slider-container ">
    <Slider   {...settings}>  
     
  
        
    
  {products.map((product:ITEM )=> <Product  product={product} />  )}
    

</Slider>
 </div>
 </Row>
  )
}

export default TrendingProduct;