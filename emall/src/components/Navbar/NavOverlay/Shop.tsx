import { Col } from "react-bootstrap"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

const Shop1 = () => {
  const [open, setOpen] = useState(false);
  return (
    <section>
      { !open ? (<div>
       <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        variant="white"

        data-bs-target="#collapse" 
        className="border border-0"
      >
         <span className=" text-outline-primary fw-bold">Shop <span  id="myP"><i className='bx bxs-chevron-down'></i></span></span> 
      </Button>
      <Collapse in={open} >
      <Col >
                <div className="bg-white  p-2    text-black fw-medium">Computer & Desktop</div>
                <div className="bg-white fw-medium  p-2  text-dark">Laptop & Ipad</div> 
                <div className="bg-white fw-medium  p-2  text-dark">Camera & Photos</div> 
                <div className="bg-white fw-medium p-2  text-dark">SmartPhones and Tablets</div> 
                <div className="bg-white fw-medium p-2 text-dark">Home & Kitchen</div>
                <div className="bg-white fw-medium p-2 text-dark">Tv &    Audios</div>
                </Col>
      </Collapse>
        
    </div>) : (<div>
       <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        variant="white"
        className="border border-0"
      >
         <span className=" text-outline-primary fw-bold">Shop <span  id="myP"><i className='bx bx-chevron-up'></i></span></span> 
      </Button>
      <Collapse in={open}>
      <Col>
                <div className="bg-white  p-2    text-black fw-medium">Computer & Desktop</div>
                <div className="bg-white fw-medium  p-2  text-dark">Laptop & Ipad</div> 
                <div className="bg-white fw-medium  p-2  text-dark">Camera & Photos</div> 
                <div className="bg-white fw-medium p-2  text-dark">SmartPhones and Tablets</div> 
                <div className="bg-white fw-medium p-2 text-dark">Home & Kitchen</div>
                <div className="bg-white fw-medium p-2 text-dark">Tv &    Audios</div>
                </Col>
      </Collapse>
        
    </div>) }
    
    </section>
  )
}

export default Shop1;