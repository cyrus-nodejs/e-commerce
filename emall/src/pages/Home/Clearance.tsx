
import { Row, Image, Button, Spinner } from "react-bootstrap"


import {  useEffect } from "react";
import { ITEM } from "../../utils/@types";

import { Link } from "react-router-dom";
import Nextrrow from "./Trending/Nextrrow";
import Previosarrow from "./Trending/Previosarrow";
import Slider from "react-slick"
import { fetchClearance, getClearance } from "../../redux/features/items/itemSlice";
import { fetchAddRecentlyViewed, fetchDeleteItem} from "../../redux/features/items/itemSlice";
import { fetchAddCart } from "../../redux/features/cart/cartSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAuthUser, fetchAsyncUser } from "../../redux/features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../redux/app/hook";
const Clearance = () => {

const dispatch = useAppDispatch()
  const clearance = useAppSelector(getClearance)
  const authUser = useAppSelector(getAuthUser)

  
  useEffect(() =>{
    dispatch(fetchClearance())
      }, [dispatch])
      

      
 
  useEffect(() =>{
    dispatch(fetchAsyncUser())
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
              slidesToShow: 5,
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
    
  return (
    
           
           
    <Row  className='' >
    {clearance && clearance.length > 0  ? (<div>
      <div>
  <div className="d-inline-flex p-2 fs-4 border-info  border-bottom">Clearance Deals</div>
</div>
    <div  className="slider-container">
  <Slider   {...settings}>  
{clearance?.map((items:ITEM, id) =>{
 return (
   <Row key={id} className=" d-flex  flex-column position-relative  mb-3" style={{width:"200px", }}>
   <Link onClick={() =>{dispatch(fetchAddRecentlyViewed(items)) }}  to={`/product/${items.title}`} className="p-2 text-decoration-none text-reset"> <Image src={items.image}  width="150px" height="200px"  className=""  /></Link> 
    <div className="d-flex flex-column ">
     <div className="text-primary fw-medium">{items.title.substring(0, 25)}</div>
    {/* <div className="d-inline-flex gap-1 text-dark fs-6">{items.rating}{items.review}</div> */}
    <div className="fw-bold ">${items.price}</div> 
    <div className="top-left  fw-bold rounded-1 px-2 text-light bg-info ">{items.status}</div> 
   {/* < div className="top-left  fw-bold rounded-1 px-2 text-light bg-success ">{items.discount}</div>  */}
     
   {authUser?.role === 'customer'  && ( <div className="text-center d-grid gap-2"><Button size="sm" onClick={() => dispatch(fetchAddCart(items))}   className="d-block" variant="dark">Add to cart</Button></div> )}  
  
  {authUser?.role === 'reseller'  && ( <div className="text-center d-grid gap-2"><Button size="sm" onClick={() => dispatch(fetchAddCart(items))}   className="d-block" variant="dark">Add to cart</Button></div> )}  
    
  {authUser?.role === 'admin' &&  (    <div className="text-center d-grid gap-2"><Button size="sm" onClick={() => dispatch(fetchDeleteItem(items))}   className="d-block" variant="dark">Delete Item</Button></div> )}   
      
      
  {authUser?.role === 'customer service' &&  (    <div className="text-center d-grid gap-2"><Button size="sm" onClick={() => dispatch(fetchAddCart(items))}   className="d-block" variant="dark">Update Item</Button></div> )}   
      

     </div>
     
     </Row>
     )
})}
</Slider>
</div>

    </div>):(<div className="fs-4 text-center"><Spinner animation="border" variant="primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner> <p className="fs-4 text-center">Refresh Page</p> </div>)}
   
   
   
  
</Row>
  )
}

export default Clearance;