
import { Col, Row,Button, Container, Image} from "react-bootstrap"
import Navbar from "../components/Navbar/Navbar"

import { ITEM } from "../utils/@types";
import { useContext  } from "react";
import axios from "axios"
import { CartContext } from "../Context/cart";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import RelatedItems from "./RelatedProducts";
import Recentlyviewed from "./Recentlyviewed";
// import CustomerViewed from "./CustomerViewed";
const Productdetails = () => {
  const {addToCart} = useContext(CartContext)
  
    const [itemDetails, setItemDetails] = useState([])
    
    
     

     const { id } = useParams()
     const handleItemDetails = () => {
      const config ={
        method:"get",
        url:`https://server-sable-beta-77.vercel.app/itemdetails/${id}`,
      }
      axios(config)
      .then(response=>{
      setItemDetails(response.data)
      
   
      })
      .catch(error => {
        alert(error)
      })
      
      }
      useEffect(() =>{
        handleItemDetails();
        
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [])
          
          
  
          
          console.log(itemDetails)
  return (
    <Container fluid>
    < Navbar />
    <Row style={{margin:"20px 20px"}} >
    
    {itemDetails.map((product:ITEM )=> 
      <Row  style={{ margin:"20px"}} >
    
      <Col  >
    <Image   fluid  src={`https://server-sable-beta-77.vercel.app/items/${product.image}`} />
    </Col>
      <Col className=""   >
      <div className="fs-4 fw-normal d-inline-flex  text-dark">{product.title}</div>
      <div className="fs-4 fw-normal d-inline-flex  ">Category:{product.category}</div>
      <div className="fs-6 text-danger fw-normal  ">Discount: {product.discount ? (product.discount) :(0)}%</div>
      <div className='text-dark fs-4'    >
      ${product.newprice}<span className="text-secondary mx-2 text-decoration-line-through">{product.discount && (product.price)}</span>
        </div>
      
     
        
        

        <Row className="d-flex">
      <div className="p-2">
       <Button variant="dark"   onClick={() => addToCart(product)} >Add to Cart </Button> 
       </div>
    </Row>
      
      </Col>
      <div className='fs-6  my-5'>
        <div className="text-start border-bottom fs-3">Product Description</div>
      <div className='fs-6 mt-3 '>{product.description} </div>
      </div>
      
    </Row>
  
    
        


    
         
      )}
      <RelatedItems />
      {/* <CustomerViewed /> */}
      <Recentlyviewed />
      </Row>
    </Container> 
  )
}

export default Productdetails