/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import "./navbar.css"
import { Container, Col, Row, Image} from 'react-bootstrap';
import { useState, useContext, useEffect,  useLayoutEffect} from "react";
 import CartModal from "../Cart/CartModal";

import { FavoriteContext } from "../../Context/wishlist";
import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
import { getUpdateUser, getIsAuthenticated, fetchAsyncUser, fetchAsyncLogout } from "../../redux/features/auth/authSlice";
import { getCartItems, getCartBills, getMessage } from "../../redux/features/cart/cartSlice";
import {Alert} from 'react-bootstrap';




import NavSearch from "./NavSearch/NavSearch";
import { Link } from "react-router-dom";
import Offcanvas from 'react-bootstrap/Offcanvas';

import uk from "../icons/uk.png"
import Department from "./Navtabs/Department";
import Home from "./Navtabs/Home";
import Product from "./Navtabs/Product";
import Shop from "./Navtabs/Shop";
import Pages from "./Navtabs/Pages";
import Blog from "./Navtabs/Blog";

import WishlistModal from "../Wishlist/WishlistModal";






const Navbar = () => {


    


  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState(false);
  const wishlistClose = () => setDisplay(false);
  const wishListShow = () => setDisplay(true);
  const cartClose = () => setShow(false);
  const cartShow = () => setShow(true);
  const {favoriteItems } = useContext(FavoriteContext)

  
    const [scrolled, setScrolled] = useState(false);
    const dispatch = useAppDispatch()
    const cartItems  = useAppSelector(getCartItems)
    const cartBills = useAppSelector(getCartBills)
    const updateUser = useAppSelector(getUpdateUser)
    const isAuthenticated = useAppSelector(getIsAuthenticated)
    const cartMessage = useAppSelector(getMessage)
    
    useEffect(() => {
    dispatch(fetchAsyncUser())
  
    }, [dispatch])
    
    
    useLayoutEffect(() => {
        const onScroll = () => {
          if (window.scrollY > 50) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        }
        
    
        window.addEventListener("scroll", onScroll);
    
        return () => window.removeEventListener("scroll", onScroll);
      
      
    
     
      }, [scrolled])

  return (
 
    <  Container  className="mainnav fixed-top  " fluid>
     {cartMessage && ( <Alert   className=" bg-dark " dismissible >
       <div className="text-light text-center   "> {cartMessage}  </div>
        </Alert>)}
 <nav className={scrolled ? "  ": "navbar navbar-expand-lg d-none d-lg-block border  "} >
  <div className="container-fluid">
    
    
    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul className="navbar-nav me-auto mb-2  mb-lg-0">
        <li className="nav-item me-3 mt-1">
         
        <select className="form-select form-select-sm   shadow-none mb-3 me-3" aria-label="">
        <option className="text-dark bg-light" value="1"> <Image src={uk} />English</option>
      <option className="text-dark bg-light" value="2">Italiano</option>
      <option className="text-dark bg-light" value="3">Francais</option>
      <option className="text-dark bg-light" value="3">Deutsche</option>
</select>
        </li>
        <li className="nav-item mt-1 me-3">
        <select className="form-select shadow-none form-select-sm" aria-label="Small select example">
        <option className="text-dark bg-light" value="1">Canadian(CAD $)</option>
      <option className="text-dark bg-light" value="2">Japan(JPY ¥)</option>
      <option className="text-dark bg-light" value="3">UK(GBP £ )</option>
      <option className="text-dark bg-light" value="4">US (USD $)</option>
</select>
      
        </li>
        <li className="nav-item my-2  text-light">
          Need Help? +001 123 456 789
        </li>
      </ul>
      <div className="d-flex" >
      <ul className="navbar-nav nav justify-content-end">
        <li className="nav-item">
          <a className="nav-link active text-white" aria-current="page" href="#">About us</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/orders">Order Tracking</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" aria-disabled="true">Contact us</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" aria-disabled="true">FAQs</a>
        </li>
      </ul>
      </div>
    </div>
  </div>
</nav>
<nav className={scrolled ? " ": "navbar navbar-expand-lg d-none d-lg-block border   "} >
  <div className="container-fluid">
   
   
    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item ">
        <a className="navbar-brand webtitle text-white fs-3" href="/">ShopHere</a>
        </li>
      </ul>
      <div className="bg-light d-flex flex-row mb-3 rounded-2">
       < div className='mt-2' >
        
{/* <select className="form-select form-select-sm border border-0 shadow-none mt-0 py-2" aria-label="currencyselect">
<option className="text-dark bg-light" value="1">All Categories</option>
      <option className="text-dark bg-light" value="2">Accessories</option>
      <option className="text-dark bg-light" value="3">Football</option>
      <option className="text-dark bg-light" value="4">Basketball</option>
</select>
      */}
    </div> 
      {/* <form className="d-flex " role="search">
          <input className="form-control border border-0   shadow-none  me-2 " type="search" placeholder="Search for products" aria-label="Search" />
          <div className=" m-1 border-0 px-2 bg-info rounded-2 border" type="submit"><i className='bx bx-search bx-md  text-light'></i></div>
        </form> */}
        <NavSearch />
        <div className=" m-1 border-0 px-2 bg-info rounded-2 border" ><i className='bx bx-search bx-md  text-light'></i></div>
        </div>
       
      <div className="d-flex justify-content-evenly" >
      {isAuthenticated && updateUser ? ( <div onClick={() => dispatch(fetchAsyncLogout())} className="d-flex flex-row m-3">
  <div className="px-1"><i className='bx bxs-group bx-lg text-light' ></i></div>
  <div className="d-flex flex-column mb-3">
  <div className=" text-light fs-6">Logout</div>
  <div className=" text-white ">Hi {updateUser?.username}</div>
  
</div>

</div>
) : (<a href="/login"><div   className="d-flex flex-row m-3">
  <div className="px-1"><i className='bx bxs-group bx-lg text-light' ></i></div>
  <div className="d-flex flex-column mb-3">
  <div className=" text-light text-decoration-onone" >Login</div>
  <div className=" text-light"> Account</div>
  
</div>

</div></a> 
) }
      
<div className="d-flex flex-row m-3" >
  <div className="px-1">
  <div  className=" position-relative" onClick={wishListShow}>
  <i className='bx bx-heart bx-lg text-light  ' ></i> <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-light text-bg-info">{favoriteItems.length}<span className="visually-hidden">unread messages</span></span>
</div>
    </div>
  
  <div className="d-flex flex-column mb-3">
  <div className=" text-light fw-medium">Favorite</div>
  <div className="text-light">My Wishlist</div>
</div>
  <>
      
      <Offcanvas show={display} onHide={wishlistClose} placement={'end'}>
        <Offcanvas.Header  closeButton>
          <Offcanvas.Title>WishList</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <WishlistModal />
        </Offcanvas.Body>
      </Offcanvas>
    </>
</div>
<div className="d-flex flex-row m-3" >
  <div className="px-1">
  <div   className=" position-relative" onClick={cartShow}>
  <i className='bx bx-cart bx-lg text-light' ></i> <span className="position-absolute top-0 text-light start-100 translate-middle badge rounded-pill text-bg-info"> {cartItems?.length > 0 ? (cartItems?.length) : (0)}  <span className="visually-hidden">unread messages</span></span>
</div>
    </div>
    
    <div className="d-flex flex-column mb-3">
  <div className="text-light">Your Cart  </div>
  <div className="text-light">${cartBills}</div>
  
</div>
  <div className="p-1 fs-5 text-light"  >  
  <div   className="me-2 text-white" >
     
      </div>
      <>
      
      <Offcanvas show={show} onHide={cartClose} placement={'end'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CartModal />
        </Offcanvas.Body>
      </Offcanvas>
    </>
</div>
  
      </div>
    </div>
    
  </div>
  </div>
</nav>

<nav className={scrolled ? "navbar navbar-expand-lg mainnav  ": "navbar navbar-expand-lg"}>
  <div className="container-fluid ">
    
<Container className="navbar-toggler border border-0 " fluid>
  <Col sm={12} md={12} className="d-flex  ">
   <div className="">
    <div className="navbar-toggler bg-white"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon text-light "></span>
    </div>
    </div>
    <div className="ms-auto">
      <div className="navbar-toggler border-0  	   " >
      <span className=" text-light ">  <a className="navbar-brand text-light fs-5 fw-medium" href="/">ShopHere</a></span>
    </div>
    </div>
    <div className="ms-auto">
      <div className="navbar-toggler border-0 " >
      <div   className=" position-relative" onClick={cartShow}>
  <i className='bx bx-cart bx-md text-light' ></i> <span className="position-absolute top-0 text-light start-100 translate-middle badge rounded-pill text-bg-info"> {cartItems?.length}  <span className="visually-hidden">unread messages</span></span>
</div>
    </div>  
    </div>
    </Col>
    <Col sm={12} md={12} className="d-flex mt-2">
    <NavSearch />
    </Col>
    
    </Container>
    <div className="offcanvas offcanvas-start"  id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <p className="offcanvas-title text-outline-primary fw-bold" id="offcanvasNavbarLabel">What are you looking for?</p>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
      <ul className="navbar-nav justify-content-start flex-grow-1  pe-3">
      <li className="nav-item ">
  <Department />
          </li>
    </ul>
        <ul className="navbar-nav  justify-content-center flex-grow-1 pe-3">
          <li className="nav-item  d-lg-none  d-xl-block d-xl-none d-xxl-block d-xxl-none">
          {isAuthenticated & updateUser? ( <div onClick={() => dispatch(fetchAsyncLogout())} className="d-flex flex-row m-3">

  <div className="d-flex flex-column ">
  <div className=" text-dark fs-5">Logout</div>
  <div className=" text-dark ">Welcome {updateUser?.username}</div>
  
</div>

</div>
) : (<a href="/login"><div   className="d-flex flex-row m-3">

  <div className="d-flex flex-column mb-3">
  <div className=" text-dark text-decoration-none" >Login</div>
  <div className=" text-dark"> Account</div>
  
</div>

</div></a> 
) }
          </li>  
          <li className="nav-item  d-lg-none d-xl-block d-xl-none d-xxl-block d-xxl-none">
       
    
          <Row   className=" ">
          
        <div className="d-flex     ">
        <div className=" flex-fill     "> 
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
          </div>
                </Link>
                <li className="nav-item ms-2  mt-2 d-lg-none d-xl-block d-xl-none d-xxl-block d-xxl-none">
                <Link to='/wishlist' className="text-decoration-none text-dark"><p className="text-outline-primary fw-bold">Wishlist({favoriteItems.length})</p> </Link>
          </li>
          <li className="nav-item mt-2 ms-2 d-lg-none d-xl-block d-xl-none d-xxl-block d-xxl-none">
          <Link to='/cart' className="text-decoration-none text-dark" > <p className="text-outline-primary fw-bold"> Cart({cartItems?.length})</p> </Link>
          </li>
          <li className="nav-item ms-2 mt-2 d-lg-none d-xl-block d-xl-none d-xxl-block d-xxl-none">
           <Link className="text-decoration-none text-dark" to='/orders'><p className="text-outline-primary fw-bold"> Track Orders</p></Link>
          </li>
             </div> 
</div>
       

        
      
        
         </Row>
          </li>
          
        
          <li className="nav-item ">
            <Shop />
          </li>
          <li className="nav-item ">
            <Home />
          </li>
           <li className="nav-item">
            <Product />
          </li>
          <li className="nav-item">
            <Pages />
          </li>
           <li className="nav-item">
            <Blog />
          </li>
           
        
        
        </ul>
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
       
           <li className="nav-item mb-">
            <a className="nav-link active text-light" aria-current="page" href="#">Sale $20 Off Your First Order</a>
          </li>
          
         
          
        </ul>
       
      </div>
    </div>
  </div>
</nav>
    </Container>

  )
     }

export default Navbar;