import {  Row, Col, Image } from 'react-bootstrap';
import { useState } from 'react';
import product1 from "../images/product1.webp"
import product2 from "../images/product2.webp"


const Product = () => {
  const [hidden, setHidden] = useState(false);
  return (
    <div
            onMouseOver={() => setHidden(true)}
            onMouseOut={() => setHidden(false)}
            className="me-3"
            >
                <Col className=" mt-2 "><div  className="border d-inline fs-6 text-light fw-bold  border-0"><span><i className='bx bxs-chevron-down'></i></span>PRODUCT</div></Col>
              {hidden ? <Row className="z-3 w-50  position-absolute   rounded-3">
                <div className="d-flex bg-white">
  <div className="p-2 flex-fill">  
                <div className="bg-white  p-2    text-black fw-medium">Computer & Desktop</div>
                <div className="bg-white fw-medium  p-2  text-dark">Laptop & Ipad</div> 
                <div className="bg-white fw-medium  p-2  text-dark">Camera & Photos</div> 
                <div className="bg-white fw-medium p-2  text-dark">SmartPhones and Tablets</div> 
                <div className="bg-white fw-medium p-2 text-dark">Home & Kitchen</div>
                <div className="bg-white fw-medium p-2 text-dark">Tv &    Audios</div>
                </div>
                <div className="p-2 flex-fill">  
                <div className="bg-white  p-2    text-black fw-medium">Computer & Desktop</div>
                <div className="bg-white fw-medium  p-2  text-dark">Laptop & Ipad</div> 
                <div className="bg-white fw-medium  p-2  text-dark">Camera & Photos</div> 
                <div className="bg-white fw-medium p-2  text-dark">SmartPhones and Tablets</div> 
                <div className="bg-white fw-medium p-2 text-dark">Home & Kitchen</div>
                <div className="bg-white fw-medium p-2 text-dark">Tv &    Audios</div>
                </div>
                <div  className="p-2 flex-fill"><Image src={product2} width='150px'height="250" className="object-fit-cover border rounded" /></div>
<div  className="p-2 flex-fill"><Image src={product1} width='150px' height="250" className="object-fit-cover border rounded" /></div>

</div>
               
        
                
              
                
                 </Row> : null
               }
            
                
                </div>
    
  )
}

export default Product