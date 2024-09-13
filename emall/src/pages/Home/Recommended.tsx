
import { Row, Image, Button,  } from "react-bootstrap"
import { CartContext } from "../../Context/cart";
import { useContext} from 'react'
import { useState, useEffect } from "react";
import { ITEM } from "../../utils/@types";
import axios from "axios";
import { Link } from "react-router-dom";
import Nextrrow from "./Trending/Nextrrow";
import Previosarrow from "./Trending/Previosarrow";
import Slider from "react-slick"
import { ItemContext } from "../../Context/items";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Recommended = () => {
  const {  addToCart } = useContext(CartContext)
  const {addRelatedItem, addViewedItem} = useContext(ItemContext)
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
          slidesToShow: 5,
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
  const [products, setProducts] = useState([])
  const handleTrending = () => {
  
    const config ={
      method:"get",
      url:`https://server-de5v5fkag-cyrus-nodejs-projects.vercel.app/recommended`, 
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
    
           
           
      <Row  className='' >
        <div>
      <div className="d-inline-flex p-2 fs-4 border-info  border-bottom">Recommended for you</div>
    </div>
      
        <div  className="slider-container">
      <Slider   {...settings}>  
  {products.map((items:ITEM, id) =>{
     return (
       <Row key={id} className=" d-flex  flex-column position-relative  mb-3" style={{width:"200px", }}>
       <Link onClick={() =>{addViewedItem(items); addRelatedItem(items);   }}  to={`/product/${items.title}`} className="p-2 text-decoration-none text-reset"> <Image src={`https://server-de5v5fkag-cyrus-nodejs-projects.vercel.app/items/${items.image}`} width="150px" height="200px"  className="" /></Link> 
        <div className="d-flex flex-column ">
         <div className="text-primary fw-medium">{items.title.substring(0, 25)}</div>
        {/* <div className="d-inline-flex gap-1 text-dark fs-6">{items.rating}{items.review}</div> */}
        <div className="fw-bold ">${items.price}</div> 
        <div className="top-left  fw-bold rounded-1 px-2 text-light bg-info ">{items.status}</div> 
       {/* < div className="top-left  fw-bold rounded-1 px-2 text-light bg-success ">{items.discount}</div>  */}
         
         <div className="text-center d-grid gap-2"><Button size="sm" onClick={() => addToCart(items)}   className="d-block" variant="dark">Add to cart</Button></div> 
         </div>
         
         </Row>
         )
  })}
   </Slider>
   </div>
</Row>
  )
}

export default Recommended;