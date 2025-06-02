
import {Col,  Button,  } from "react-bootstrap"
import { FavoriteContext } from "../../../Context/wishlist";
import { useContext, useState} from 'react'
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useAppDispatch,  } from "../../../redux/app/hook";
import { fetchAddCart } from "../../../redux/features/cart/cartSlice";

import { ITEM } from "../../../utils/@types";
import '../Home.css'



const Product = ({product}: { product: ITEM }) => {
const dispatch = useAppDispatch()
    const [hidden, setHidden] = useState(false);
   
   const {addTofavorite, state} = useContext(FavoriteContext)

  
  
  return (
      
    <Col  className='m-2 '  >
   
      <div  onMouseOver={() => setHidden(true)}
          onMouseOut={() => setHidden(false)}
           className="d-flex flex-column rounded-3  mb-3">
<div >

<div className="position-relative my-3">
  
      <LazyLoadImage style={{ width: '130px', height: '130px',  }} src={product.image}    effect="blur" alt={product.image}   className="" />
  { hidden && <div>
    <OverlayTrigger
          
          placement="top"
          overlay={
            <Tooltip >
              Add Wishlist 
            </Tooltip>
          }
        >
           <div className="position-absolute z-3 top-50 wish end-0 translate-middle" onClick={() => addTofavorite(product)}><i className='bx bx-heart view-wish  bx-sm  bx-border-circle'></i></div>
        </OverlayTrigger>
        {/* <OverlayTrigger
          placement="left"
          overlay={
            <Tooltip id={`tooltip-$`}>
              Add compare
            </Tooltip>
          }
        >
          <div className="position-absolute compare top-50 py-1 end-0 translate-middle"><i className='bx bx-layer bg-light text-dark bx-sm bx-border-circle '></i></div>
        </OverlayTrigger> */}
        <OverlayTrigger
          
          placement="left"
          overlay={
            <Tooltip id={`tooltip-$`}>
              Quick view
            </Tooltip>
          }
        >
            <Link   to={`/product/${product._id}`} className="p-2 text-decoration-none text-reset"> <div className="position-absolute view bottom-50 end-0 translate-middle"><i className='bx z-3 bx-show view-wish bx-sm  bx-border-circle '></i>
  </div></Link>
        </OverlayTrigger>

  
  
  </div>
  }  

      
      </div>
</div>
<div className=" text-primary fw-medium"> {product.title.substring(0, 25)}</div>

<div className=" fw-bold"> {state.currency}{product.price} </div>

</div>

      
     
     
      
   

   <div className="text-center d-grid gap-2"><Button size="sm" onClick={() => dispatch(fetchAddCart(product))}   className="d-block" variant="dark">Add to cart</Button></div> 
  
   
       

       

</Col>
  )
}

export default Product