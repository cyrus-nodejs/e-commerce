import "../Home/Home.css"

import {  Button, Row, Col, Carousel , Image } from "react-bootstrap"
import Headphone from "./images/Headphone & Audio.avif"
import Wireless from "./images/Wireless Earbuds.avif"
import Decor from "./images/Decor & Furniture.avif"
import Cellphone from "./images/Cellphone & Tablets.avif"
import banner from "./images/banner.webp"
import banner1 from "./images/banner2.webp"

const Banner = () => {
  return (
    <Row className=" ">
    <Col sm={12} md={6} className="mb-3 rounded d-none d-sm-block ">
    <Carousel prevIcon={<i className='bx bxs-skip-previous-circle bx-lg'></i>} nextIcon={<i className='bx bxs-skip-next-circle bx-lg'></i>}>
<Carousel.Item>
<Image src={banner1}  rounded className="banner rounded"/>
<Carousel.Caption>
  <p className="fs-1 fw-normal text-white text-start">Sport Edition</p>
  
  <p  className="fs-1 fw-normal text-white text-start" >Red Special Edition </p>
  <p className="fs-4 fw-normal text-white text-start">Wireless Connection with Tv, Computer, Laptop </p>
  <p className="fs-5 fw-normal text-white text-start">Red Special Edition </p>
  <Button variant="dark">Discover Now</Button>
</Carousel.Caption>
</Carousel.Item>
<Carousel.Item>
<Image className="banner" src={banner}    rounded />
<Carousel.Caption>
<p className="fs-1 fw-normal text-white text-start">Sport Edition</p>
  
  <p  className="fs-1 fw-normal text-white text-start" >Red Special Edition </p>
  <p className="fs-4 fw-normal text-white text-start">Wireless Connection with Tv, Computer, Laptop </p>
  <p className="fs-5 fw-normal text-white text-start">Red Special Edition </p>
</Carousel.Caption>
</Carousel.Item>
<Carousel.Item>
<Image className="banner " src={banner1} rounded />
<Carousel.Caption>
<p className="fs-3 fw-normal text-white text-start">Sport Edition</p>
  
  <p  className="fs-1 fw-normal text-white text-start" >Red Special Edition </p>
  <p className="fs-4 fw-normal text-white text-start">Wireless Connection with Tv, Computer, Laptop </p>
  <p className="fs-5 fw-normal text-white text-start">Red Special Edition </p>
</Carousel.Caption>
</Carousel.Item>
</Carousel>
    </Col>
    
    <Col sm={12} md={6} className="d-none d-sm-block" >
        <Row className="">
    <Col sm={12} md={6} className="mb-3 position-relative  "  ><Image src={Headphone} className=" ban1 ms-2 " fluid  rounded />
    <div  className="position-absolute top-50 start-25 translate-middle-y p-3"><p className="text-light  fs-3 fw-normal">Canyon Star Raider</p> <p className='text-light'>Headphone & Audio</p></div></Col>
    <Col sm={12} md={6} className="mb-3 position-relative"  ><Image src={Wireless} className="ban1 ms-2" fluid rounded />
    <div  className="position-absolute top-50 start-25 translate-middle-y p-3"><p className="text-light  fs-3 fw-normal">Galaxy Bud Plus</p> <p className='text-light'>Wireless Earbuds</p></div>
    </Col>
    <Col sm={12} md={6} className="mb-3 position-relative"  ><Image src={Decor} className="ban1 ms-2" fluid rounded />
    <div  className="position-absolute top-50 start-25 translate-middle-y p-3"><p className="text-light  fs-3 fw-normal">Chair Swoon Lounge</p> <p className='text-light'>Decor & Furniture</p></div></Col>
    <Col sm={12} md={6} className="mb-3 position-relative"   ><Image src={Cellphone} className="ban1 ms-2" fluid rounded />
    <div  className="position-absolute top-50 start-25 translate-middle-y p-3"><p className="text-light  fs-3 fw-normal">Phone Galaxy S20</p> <p className='text-light'>Cellphone & Tablets</p></div></Col>
    </Row>
    </Col>
    
</Row>
  )
}

export default Banner