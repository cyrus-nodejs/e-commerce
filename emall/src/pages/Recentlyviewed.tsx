 
import { Row, Image,   } from "react-bootstrap"

import { useState, useEffect } from "react";
import axios from "axios";
import { VIEWITEM } from "../utils/@types";


// import { CartContext } from "../Context/cart";
// import { useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
const Recentlyviewed = () => {
  

 
  const [products, setProducts] = useState([])
  const handleTrending =  async () => {
      try {
        const { data } = await axios.get(
          "https://emall-server.onrender.com/getviewed",
          {withCredentials: true}
        );
        
        const { success, message, view} = data;
        if (success) {
          setProducts(view.items)
        } else {
         console.log(message);
         
         
        }
      } catch (error) {
        console.log(error)
      }
      
    
      
  
    }
  
      
       
    
     
    useEffect(() =>{
  handleTrending();
  
    }, [])
    console.log(products)
  return (
    
           
           
      <Row  className='' >
         {products && (
          <div>
           <div>
           <div className="d-inline-flex p-2 fs-4 border-info  border-bottom">Recently Viewed</div>
         </div>
           
             {/* <div  className="slider-container">
           <Slider   {...settings}>   */}
           <div className="">
            <div className="row">

            
       {products.reverse().map((items:VIEWITEM, id) =>{
          return (
            <Row key={id} className=" d-flex  flex-column position-relative  mb-3" style={{width:"200px", }}>
             <Link  to={`/product/${items.title}`} className="p-2 text-decoration-none text-reset"> 
           
             <Image src={items.image} width="150px" height="200px"  className="" />
             </Link> 
             <div className="d-flex flex-column ">
              <div className="text-primary text-truncate fw-medium">{items.title}</div>
             {/* <div className="d-inline-flex gap-1 text-dark fs-6">{items.rating}{items.review}</div> */}
             <div className="fw-bold ">${items.price}</div> 
             <div className="top-left  fw-bold rounded-1 px-2 text-light bg-info ">{items.discount ? (<div>-{items.discount}%</div>) : (<div></div>)}</div> 
             {/* < div className="top-left  fw-bold rounded-1 px-2 text-light bg-success ">{items.discount}</div>   */}
            
              {/* <div className="text-center d-grid gap-2"><Button size="sm" onClick={() => addToCart(items)}   className="d-block" variant="dark">Add to cart</Button></div>  */}
              </div>
              
              </Row>
              )
       })}
       </div>
       </div>
        {/* </Slider>
        </div> */}
        </div>
         )}
       
</Row>
  )
}

export default Recentlyviewed;