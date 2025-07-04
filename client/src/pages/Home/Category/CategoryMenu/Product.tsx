import {Col  } from "react-bootstrap"
import { CATEGORY } from "../../../../utils/@types"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../../Home.css'



const Product = ({product}: { product: CATEGORY }) => {
//get total quantity of items by category
  return (    <a  href={`/category/${product.title}`} className="p-2 text-decoration-none text-reset">
            <Col   className="container"   >
           
              <LazyLoadImage src={product.image}  
              
        style={{ width: '100%', height: 'auto' }}  effect="blur" />
            <div className="top-left">

             <p className="text-light ">{product.title}</p> 
             <p className="text-light"> ({product.item.length} products )</p> 
             
            
            </div>
            
          </Col>
          </a>
        
    
   
  )
}

export default Product