

import {  Row, Col } from 'react-bootstrap';
import { useState } from 'react';
const Home = () => {

  const [hidden, setHidden] = useState(false);
  
  return (
    
   
            <div
            onMouseEnter={() => setHidden(true)}
            onMouseLeave={() => setHidden(false)}
            className="me-3"
            >
              
            <Col className="mt-2  "><div  className="d-inline
             fs-6 text-light fw-bold  "><span><i className='bx bxs-chevron-down'></i></span>HOME</div></Col>
              {hidden && <Row 
                   
                  className="z-1  w-50 position-absolute   rounded-3"   >
                <div className="d-flex bg-white">
  <div className="p-2 flex-fill">  
                <div className="bg-white  p-2    text-black fw-medium">Computer & Desktop</div>
                <div className="bg-white fw-medium  p-2  text-dark">Laptop & Ipad</div> 
                <div className="bg-white fw-medium  p-2  text-dark">Camera & Photos</div> 
                <div className="bg-white fw-medium p-2  text-dark">SmartPhones and Tablets</div> 
                <div className="bg-white fw-medium p-2 text-dark">Home & Kitchen</div>
                <div className="bg-white fw-medium p-2 text-dark">Tv &    Audios</div>
                </div>
  <div className="p-2 flex-fill">  <div className="bg-white  p-2    text-black fw-medium">Computer & Desktop</div>
                <div className="bg-white fw-medium  p-2  text-dark">Laptop & Ipad</div> 
                <div className="bg-white fw-medium  p-2  text-dark">Camera & Photos</div> 
                <div className="bg-white fw-medium p-2  text-dark">SmartPhones and Tablets</div> 
                <div className="bg-white fw-medium p-2 text-dark">Home & Kitchen</div>
                <div className="bg-white fw-medium p-2 text-dark">Tv &    Audios</div>
                </div>
  
</div>
               
        
                
              
                
                 </Row> 
               }
            
                
                </div>
  
  )
}

export default Home