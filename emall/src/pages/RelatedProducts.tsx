
import { Row, Image, Button,  } from "react-bootstrap"

import {  useContext} from "react";

// import { ItemContext } from "../Context/items";
import Nextrrow from "./Home/Trending/Nextrrow";
import Previosarrow from "./Home/Trending/Previosarrow";
import Slider from "react-slick"
import { CartContext } from "../Context/cart";
import { ITEM } from "../utils/@types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
const RelatedItems = () => {
  const {addToCart} = useContext(CartContext)
const relatedItem = JSON.parse(localStorage.getItem("relateditem") || '') 

console.log(relatedItem)
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
     
      <Row  className='' >
        {relatedItem && (
          <div>
          <div>
          <div className="d-inline-flex p-2 fs-4 border-info  border-bottom">Related Products</div>
        </div>
          
            <div  className="slider-container">
          <Slider   {...settings}>  
      {relatedItem.map((items:ITEM) =>{
         return (
           <Row  className=" d-flex  flex-column position-relative  mb-3" style={{width:"200px", }}>
            <Link  to={`/product/${items.title}`} className="p-2 text-decoration-none text-reset"> 
            <Image src={`https://emall-server.onrender.com/items/${items.image}`} width="150px" height="200px"  className="" />
            </Link>
            <div className="d-flex flex-column ">
             <div className="text-primary fw-medium">{items.title.substring(0, 25)}</div>
             <div className="d-inline-flex gap-1 text-dark fs-6">{items.rating}{items.review}</div> 
            <div className="fw-bold ">${items.price}</div> 
            {/* <div className="top-left  fw-bold rounded-1 px-2 text-light bg-info ">{items.status}</div>  */}
           
            <div className="top-left  fw-bold rounded-1 px-2 text-light bg-info ">{items.discount ? (<div>-{items.discount}%</div>) : (<div></div>)}</div>  
             
             <div className="text-center d-grid gap-2"><Button size="sm" onClick={() => addToCart(items)}   className="d-block" variant="dark">Add to cart</Button></div> 
             </div>
             
             </Row>
             )
      })}
       </Slider>
       </div> 
       </div>
        )}
    
       
</Row>
  )
}

export default RelatedItems;