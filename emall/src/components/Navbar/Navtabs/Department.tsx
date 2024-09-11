
import {  Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Department = () => {
  const [hidden, setHidden] = useState(false);
  return (
    <div
    onMouseOver={() => setHidden(true)}
    onMouseOut={() => setHidden(false)}
    className=""
    >

      <Col className="mt-2  "><div  className="d-inline fs-6 text-light fw-bold    border-0"><span><i className='bx bx-menu '></i></span>SHOP BY DEPARTMENT</div></Col>
      {hidden ? <Row   className="z-3  w-25 position-absolute ">
        <div className="d-flex     ">
        <div className=" flex-fill border  rounded-2  "> 
        <Link to="/category/Computer & Desktop" className="text-decoration-none text-rest"><div className="bg-white   d-flex   text-black fw-medium">
        <div className="p-1 mt-2"><span className="me-1"><i className='bx bx-laptop'></i></span><span>Computing</span></div>
        {/* <div className="p-2 ms-auto"><i className='bx bx-chevron-right bx-md ms-5'></i></div> */}
          </div>
          </Link>
                <Link to="/category/Groceries" className="text-decoration-none text-reset"> 
                <div className="bg-white   d-flex   text-black fw-medium">
        <div className="p-1 mt-2 "><span className="me-1"><i className='bx bx-store'></i></span><span>Groceries</span></div>
        {/* <div className="p-2 ms-auto"><i className='bx bx-chevron-right bx-md ms-5'></i></div> */}
          </div>
                 </Link> 
                <Link to="/category/Fashion & Clothing" className="text-decoration-none text-reset"> 
                <div className="bg-white   d-flex   text-black fw-medium">
        <div className="p-1 mt-2"><span className="me-1"><i className='bx bxs-dryer'></i></span><span>Fashion</span></div>
        {/* <div className="p-2 ms-auto"><i className='bx bx-chevron-right bx-md ms-5'></i></div> */}
          </div>
                 </Link>
                <Link to="/category/Smartphones & Tablets" className="text-decoration-none text-rest">  
                <div className="bg-white   d-flex   text-black fw-medium">
        <div className="p-1 mt-2"><span className="me-1"><i className='bx bx-devices'></i></span><span>Mobile</span></div>
        {/* <div className="p-2 ms-auto"><i className='bx bx-chevron-right bx-md ms-5'></i></div> */}
          </div>
                 </Link>
                <Link to="/category/Home & Kitchen" className="text-decoration-none text-rest">  
                <div className="bg-white   d-flex   text-black fw-medium">
        <div className="p-1 mt-2"><span className="me-1"><i className='bx bx-selection'></i></span><span>Appliances</span></div>
        {/* <div className="p-2 ms-auto"><i className='bx bx-chevron-right bx-md ms-5'></i></div> */}
          </div>
                </Link>
                <Link to="/category/Tv & Audios" className="text-decoration-none text-rest">  
                <div className="bg-white   d-flex   text-black fw-medium">
        <div className="p-1 mt-2"><span className="me-1"><i className='bx bx-tv'></i></span><span>Electronics</span></div>
        {/* <div className="p-2 ms-auto"><i className='bx bx-chevron-right bx-md ms-5'></i></div> */}
          </div>
                </Link>
                <Link to="/category/Smartphones & Tablets" className="text-decoration-none text-rest">  
                <div className="bg-white   d-flex   text-black fw-medium">
        <div className="p-1 mt-2"><span className="me-1"><i className='bx bx-devices'></i></span><span>Mobile</span></div>
        {/* <div className="p-2 ms-auto"><i className='bx bx-chevron-right bx-md ms-5'></i></div> */}
          </div>
                 </Link>
                <Link to="/category/Home & Kitchen" className="text-decoration-none text-rest">  
                <div className="bg-white   d-flex   text-black fw-medium">
        <div className="p-1 mt-2"><span className="me-1"><i className='bx bx-selection'></i></span><span>Appliances</span></div>
        {/* <div className="p-2 ms-auto"><i className='bx bx-chevron-right bx-md ms-5'></i></div> */}
          </div>
                </Link>
                <Link to="/category/Tv & Audios" className="text-decoration-none text-rest">  
                <div className="bg-white   d-flex   text-black fw-medium">
        <div className="p-1 mt-2"><span className="me-1"><i className='bx bx-tv'></i></span><span>Electronics</span></div>
        {/* <div className="p-2 ms-auto"><i className='bx bx-chevron-right bx-md ms-5'></i></div> */}
          </div>
                </Link>
             </div> 
</div>
       

        
      
        
         </Row> : null
       }
    
        
        </div>
   
  )
}

export default Department;