
import {  Col } from 'react-bootstrap';
import { useState } from 'react';


const Blog = () => {
  const [hidden, setHidden] = useState(false);
  return (
   
    <div
    onMouseOver={() => setHidden(true)}
    onMouseOut={() => setHidden(false)}
    className=""
    >
       <Col className="mt-2  "><div  className="d-inline  fs-6 text-light fw-bold  "><span><i className='bx bxs-chevron-down'></i></span>BLOG</div></Col>
      {hidden ? <div  className="z-3  w-25 position-absolute   rounded-5">
        <div className="d-flex bg-white">

<div className="p-2 flex-fill">  <div className="bg-white  p-2    text-black fw-medium">Computer & Desktop</div>
        <div className="bg-white fw-medium  p-2  text-dark">Laptop & Ipad</div> 
        <div className="bg-white fw-medium  p-2  text-dark">Camera & Photos</div> 
        <div className="bg-white fw-medium p-2  text-dark">SmartPhones and Tablets</div> 
        <div className="bg-white fw-medium p-2 text-dark">Home & Kitchen</div>
        <div className="bg-white fw-medium p-2 text-dark">Tv &    Audios</div>
        </div>

</div>
       

        
      
        
         </div> : null
       }
    
        
        </div>
  )
}

export default Blog