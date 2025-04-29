
import { Row,  Button,  } from "react-bootstrap"
import {  useEffect, useContext  } from "react";
import { FavoriteContext } from "../../Context/wishlist";
import { ITEM } from "../../utils/@types";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "react-router-dom";
import Nextrrow from "./Trending/Nextrrow";
import Previosarrow from "./Trending/Previosarrow";
import Slider from "react-slick"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppSelector, useAppDispatch } from "../../redux/app/hook";
import { getRecommended, fetchRecommended } from "../../redux/features/items/itemSlice";
import { fetchAddRecentlyViewed } from "../../redux/features/items/itemSlice";
import { fetchAddCart } from "../../redux/features/cart/cartSlice";
// import { getAuthUser, fetchAsyncUser } from "../../redux/features/auth/authSlice";
const Recommended = () => {
const dispatch = useAppDispatch()
const recommended = useAppSelector(getRecommended)
const {state} = useContext(FavoriteContext)
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
          slidesToShow: 4,
          slidesToScroll: 1,
          
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
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
  
    useEffect(() =>{
  dispatch(fetchRecommended())
  
    }, [dispatch])
    
    // useEffect(() =>{
    //   dispatch(fetchAsyncUser())
      
    //     }, [dispatch])
        
  return (
    
           
           
      <Row  className='' >
        {recommended && recommended.length > 0  ? (<div>  <div>
      <div className="d-inline-flex p-2 fs-4 border-info  border-bottom">Recommended for you</div>
    </div>
      
        <div  className="slider-container">
      <Slider   {...settings}>  
  {recommended?.map((items:ITEM, id) =>{
     return (
       <Row key={id} className=" d-flex  flex-column position-relative  mb-3" style={{width:"200px" }}>
       <Link onClick={() =>{dispatch(fetchAddRecentlyViewed(items))   }}  to={`/product/${items.title}`} className="p-2 text-decoration-none text-reset"> <LazyLoadImage src={items.image} effect="blur" style={{ width: '100%', height: 'auto' }}  className="" /></Link> 
        <div className="d-flex flex-column ">
         <div className="text-primary fw-medium">{items.title.substring(0, 25)}</div>
        {/* <div className="d-inline-flex gap-1 text-dark fs-6">{items.rating}{items.review}</div> */}
        <div className="fw-bold ">{state.currency}{items.price}</div> 
     
       {/* < div className="top-left  fw-bold rounded-1 px-2 text-light bg-success ">{items.discount}</div>  */}
         
          <div className="text-center d-grid gap-2"><Button size="sm" onClick={() => dispatch(fetchAddCart(items))}   className="d-block" variant="dark">Add to cart</Button></div>  
      </div>
         
         </Row>
         )
  })}
   </Slider>
   </div></div>):<div className="fs-4 my-2 text-center"></div>}
      
</Row>
  )
}

export default Recommended;