

 
 import{Row, Col, Image, Container, } from 'react-bootstrap';
import { Link } from "react-router-dom";

import Navbar from '../components/Navbar/Navbar';
import { ItemContext } from '../Context/items';
import { useContext, useState, useEffect } from 'react'
import axios from "axios";
import Recentlyviewed from './Recentlyviewed';
import { useParams } from "react-router-dom";
import { ITEM } from '../utils/@types';


const Category = () => {
  
  
  const {addRelatedItem, addViewedItem} = useContext(ItemContext)
  const [category, setCategory] = useState([])
  const { id } = useParams();

 

   
  const handleCategoryMenu = async () => {
    try {
  
        const { data } = await axios.get(
          `https://emall-server.onrender.com/category/${id}`,
          {withCredentials: true}
        );
        
        const { success, message, item } = data;
        if (success) {
            setCategory(item)
            console.log(item)
      } else {
        console.log(message);
      
      }
      } catch (error) {
        console.log
      }
    
    
    
    }
    useEffect(() =>{
  handleCategoryMenu();
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  console.log(category)
    return (
        <section className="" style={{background:""}}>
        <Container fluid>
        
        <Navbar />

            <Row className="p-2  " style={{borderRadius:"5px", marginTop:"", background:"", color:'black', justifyContent:""}}><p className="fs-3 fw-normal sb   text-center" >{id} Deals</p></Row>
      {category.map((item:ITEM )=> 
        <Row  key={item._id} style={{width: '11.5rem', display:"inline-flex", height:"15rem", margin:"10px"}}>
               
           <Col  className="frame"  style={{border:"1px solid white", borderRadius:"10px", width:"11rem", height:"15rem", backgroundColor:"#FFFFFF",}}       >
           <center>
           <Link to={`/product/${item.title}`} onClick={() =>{addViewedItem(item); addRelatedItem(item) }} className="p-2 text-decoration-none text-reset"> 
           <Image  style={{width:'8rem', height:"10rem" }}  rounded src={`https://emall-server.onrender.com/items/${item.image}`} />
        <p className="fs-6  tfont  ">{item.title.substring(0, 10) + ".."}</p>
        <p className="fs-6 fw-bold  text-danger  " >
         ${item.price}
        </p>
        </Link>
        </center>
    </Col>
    </Row>
     )}
      
          
          <Recentlyviewed />
        </Container>
            </section>
  )
}

export default Category