import {Row } from "react-bootstrap"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CATEGORY } from "../../../utils/@types";
import Product from "./Product";
import Nextrrow from "../Trending/Nextrrow";
import Previosarrow from "../Trending/Previosarrow";
import { useState, useEffect } from "react";
import axios from "axios";
const Categories = () => {
  const [products, setProducts] = useState([])
  
  const settings = {
    infinite: false,

    speed: 0,
    nextArrow:<Nextrrow className={undefined} style={undefined} onClick={undefined} />,
    prevArrow:<Previosarrow className={undefined} style={undefined} onClick={undefined} />,
    initialSlide: 0,
    // slidesToShow: screenType === "MOBILE" ? 1 :"5" ,
    // slidesToScroll: screenType === "MOBILE" ? 6 : "6",
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 6,
          infinite: true,
          
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 6,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 6,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 6,
          
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
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
      url:`https://server-de5v5fkag-cyrus-nodejs-projects.vercel.app/category`, 
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
    <Row className="my-3">

      <div className="mb-4">
      <div className="d-inline-flex p-2 fs-4 border-info  border-bottom">Popular Categories</div>
    </div>
    
    <div className="slider-container  ">
    <Slider {...settings}>
    {products.map((product:CATEGORY)=> <Product  product={product}/>  )}
    </Slider>
    </div>
    </Row>
  )
}

export default Categories