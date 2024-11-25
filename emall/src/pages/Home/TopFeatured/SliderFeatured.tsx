
import { Row, Image , Col,  Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Nextrrow from "../Trending/Nextrrow"
import Previosarrow from "../Trending/Previosarrow"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import '../Home.css'
import {  useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/app/hook";
import {fetchAddRelated, fetchAddRecentlyViewed, fetchTopFeaturedSlide, getTopFeaturedSlide } from "../../../redux/features/items/itemSlice";
import { fetchAddCart } from "../../../redux/features/cart/cartSlice";
import { ITEM } from "../../../utils/@types";

const SliderFeatured = () => {
  const dispatch = useAppDispatch()



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
 
  
     
    useEffect(() =>{
  dispatch(fetchTopFeaturedSlide())
  
    }, [dispatch])
    // console.log(products)
    const topFeaturedSlide = useAppSelector(getTopFeaturedSlide)
  return (
    <Row  className='px-5' >
   {topFeaturedSlide && topFeaturedSlide.length > 0 ? (<div><div  className="slider-container">
    <Slider   {...settings}>  
{ topFeaturedSlide?.map((product:ITEM) =>{
   return (
    

    <Row  className=" d-flex flex-row">
                                  
      <Col className="container" >    <Link onClick={() =>{dispatch(fetchAddRecentlyViewed(product)); dispatch(fetchAddRelated(product))  }}  to={`/product/${product.title}`} className="p-2 text-decoration-none text-reset"><Image src={product.image} loading="lazy" fluid  className="" />    </Link></Col>
      
      <Col >
      <div className="d-flex flex-column">
       <div className="text-primary fw-medium">{product.title}</div>
      {/* <div className="d-inline-flex gap-1 text-dark fs-6">{product.rating}{product.review}</div> */}
      <div className="fw-bold ">${product.price}</div> 
      <div className="top-left rounded-1 px-2 text-light bg-info">{product.status}</div>
      <div className="">{product.description.substring(0, 100)}</div>
       <div className="text-center d-grid gap-2"><Button size="sm" className="d-block" onClick={() => dispatch(fetchAddCart(product))}  variant="outline-dark">Add to cart</Button></div> 
       
       </div>
       </Col>
       
       </Row>
   
       )
})}
 </Slider>
 </div></div>) : (<div className='my-2 text-end fs-4'>TopfeaturedSlide loading..</div>)}
      
</Row>

  )
}

export default SliderFeatured