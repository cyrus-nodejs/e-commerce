import { ITEM } from "../utils/@types";
import { Row,Col, Button,  } from "react-bootstrap"
import Nextrrow from "./Home/Trending/Nextrrow";
import Previosarrow from "./Home/Trending/Previosarrow";
import Slider from "react-slick"
import {  useEffect, useContext  } from "react";
import { FavoriteContext } from "../Context/wishlist";
import { useAppDispatch, useAppSelector } from "../redux/app/hook";
import { fetchAddCart } from "../redux/features/cart/cartSlice";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { fetchGetRelated, getRelated } from "../redux/features/items/itemSlice";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RelatedItems = ({products}: { products: ITEM | null}) => {

  console.log(products)

  const dispatch = useAppDispatch()
  const relatedItem =   useAppSelector(getRelated)

  console.log(relatedItem)
    useEffect(() =>{
      dispatch(fetchGetRelated(products))
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [dispatch])
   
       
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
          slidesToShow: 5,
          slidesToScroll: 8,
          
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
  
  
      

    
     
   
           
  return (
     
      <Col  className='' >
        {relatedItem && (
          <div>
          <div>
          <div className="d-inline-flex p-2 fs-4 border-info  border-bottom">Related Products</div>
        </div>
          
            <div  className="slider-container ">
          <Slider   {...settings}>  
      {relatedItem.map((items:ITEM) =>{
         return (
           <Row  className=" d-flex  flex-column position-relative  mb-3" >
            <Link  to={`/product/${items._id}`} className="p-2 text-decoration-none text-reset"> 
            <LazyLoadImage effect="blur" src={items.image}  style={{ width: '100%', height: 'auto' }}  className="" />
            </Link>
            <div className="d-flex flex-column ">
             <div className="text-primary ">{items.title.substring(0, 25)}</div>
          
            <div className=" ">{state.currency}{items.price}</div> 
            {/* <div className="top-left  fw-bold rounded-1 px-2 text-light bg-info ">{items.status}</div>  */}
           
            <div className="top-left   rounded-1 px-2 text-light bg-info ">{items.discount ? (<div>-{items.discount}%</div>) : (<div></div>)}</div>  
             
              <div className="text-center d-grid gap-2"><Button size="sm" onClick={() => dispatch(fetchAddCart(items))}   className="d-block" variant="dark">Add to cart</Button></div>  
           
             </div>
             
             </Row>
             )
      })}
       </Slider>
       </div> 
       </div>
        )}
    
       
</Col>
  )
}

export default RelatedItems;