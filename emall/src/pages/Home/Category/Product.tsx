import {Col,   Image,   } from "react-bootstrap"
import { CATEGORY } from "../../../utils/@types"

import '../Home.css'



const Product = ({product}: { product: CATEGORY }) => {
//get total quantity of items by category
  return (    <a  href={`/category/${product.category}`} className="p-2 text-decoration-none text-reset">
            <Col   className="container"   >
           
              <Image src={product.avatar}  />
            <div className="top-left">

             <p className="text-light">{product.category}</p> 
             <p className="text-light"> ({product.item.length} products )</p> 
             
            
            </div>
            
          </Col>
          </a>
        
    
   
  )
}

export default Product