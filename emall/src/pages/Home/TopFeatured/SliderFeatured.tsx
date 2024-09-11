
import { Row, Image , Col,  Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Nextrrow from "../Trending/Nextrrow"
import Previosarrow from "../Trending/Previosarrow"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import '../Home.css'
import { useState, useEffect, useContext } from "react";
import axios from "axios"
import { CartContext } from "../../../Context/cart";
import { ITEM } from "../../../utils/@types";
import { ItemContext } from "../../../Context/items";
const SliderFeatured = () => {
    const {addRelatedItem, addViewedItem} = useContext(ItemContext)
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow:<Nextrrow className={undefined} style={undefined} onClick={undefined} />,
    prevArrow:<Previosarrow className={undefined} style={undefined} onClick={undefined} />,
    initialSlide: 0,
    // slidesToShow: screenType === "MOBILE" ? 1 : 1,
    // slidesToScroll: screenType === "MOBILE" ? 1 : 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          slidesToScroll:2,
          infinite: true,
          
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };
  const {addToCart} = useContext(CartContext)
  const [products, setProducts] = useState([])
  const handleTopFeatured = () => {
  
    const config ={
      method:"get",
      url:`http://localhost:3000/topfeaturedslide`, 
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
  handleTopFeatured();
  
    }, [])
    // console.log(products)
  return (
    <Row  className='px-5' >
   
      <div  className="slider-container">
    <Slider   {...settings}>  
{products.map((product:ITEM) =>{
   return (
    

    <Row  className=" d-flex flex-row">
     
      <Col className="container" >    <Link onClick={() =>{addViewedItem(product); addRelatedItem(product);   }}  to={`/product/${product.title}`} className="p-2 text-decoration-none text-reset"><Image src={`http://localhost:3000/items/${product.image}`} fluid  className="" />    </Link></Col>
      
      <Col >
      <div className="d-flex flex-column">
       <div className="text-primary fw-medium">{product.title}</div>
      {/* <div className="d-inline-flex gap-1 text-dark fs-6">{product.rating}{product.review}</div> */}
      <div className="fw-bold ">${product.price}</div> 
      <div className="top-left rounded-1 px-2 text-light bg-info">{product.status}</div>
      <div className="">{product.description.substring(0, 100)}</div>
       <div className="text-center d-grid gap-2"><Button size="sm" className="d-block" onClick={() => addToCart(product)}  variant="outline-dark">Add to cart</Button></div> 
       
       </div>
       </Col>
       
       </Row>
   
       )
})}
 </Slider>
 </div>
</Row>

  )
}

export default SliderFeatured