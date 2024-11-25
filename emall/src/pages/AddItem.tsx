
import { useEffect, useState } from 'react';
import axios from "axios";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/app/hook";
import { fetchAsyncUser, getIsAuthenticated, getUpdateUser } from '../redux/features/auth/authSlice';

import Navbar from '../components/Navbar/Navbar';

const Additem = () => {
  const  dispatch = useAppDispatch()

  const user = useAppSelector(getUpdateUser)
 
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  
  useEffect(() =>{
    dispatch(fetchAsyncUser())
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [dispatch])


    const [state, setState] = useState({
     title:"",
     description:"",
       image:"",
        category:"",
      price:"",
      quantity:"",
       trending:"",
          recommended:"",
          topfeatured:"",
         topdeals:"",
         discount:"",
         status:"",
        
         
   })
   const [isLoading, setLoading] = useState(false);

   useEffect(() => {
     function simulateNetworkRequest() {
       return new Promise((resolve) => setTimeout(resolve, 2000));
     }
 
     if (isLoading) {
       simulateNetworkRequest().then(() => {
         setLoading(false);
       });
     }
   }, [isLoading]);
 
 
 const handleChange = (e: { preventDefault: () => void; target: { name: string; value: string; }; }) => {
e.preventDefault();
setState({...state, [e.target.name] : e.target.value})
 }

//  const handleImage = (e) => {
//   setState({...state, image : e.target.files})
//  }

  // const handleAvatar = (e) => {
  //  setState({...state, avatar : e.target.files[0]})
  // }

 
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImage = (e:any) => {
    setState({...state, image : e.target.files[0]})
   }
 



   const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
   
    setLoading(true)
   
   
    const formData = new FormData;
    formData.append("title", state.title)
    formData.append("description", state.description)
      formData.append("image", state.image);
      // formData.append("avatar", state.avatar);
      // for (let i = 0; i < state.image.length; i++) {
      //   formData.append('image', state.image[i]);
      // }
  formData.append("category", state.category)
     formData.append("price", state.price)
     formData.append("quantity", state.quantity)
     formData.append("trending", state.trending)
        formData.append("recommended",  state.recommended)
        formData.append("topfeatured", state.topfeatured)
        formData.append("topdeals", state.topdeals)
        formData.append("discount", state.discount)
        formData.append("status", state.status)
        
       
      
       
    axios.post("https://emall-server.onrender.com/items",  
  formData, {withCredentials:true} )
    .then(response => {
      alert(response.statusText)
      alert("Item saved successfully!")
    })
    .catch(err =>{
      console.log(err)
      alert('Not saved!')
    })
  }

   
   
  return (
    <section className="mx-5 py-2 border ">
      {isAuthenticated && user ? ( <Container fluid>
<Navbar />
        <p className="fs-3 text-center">Upload Item</p>
     <Form encType="multipart/form-data">
      <Row className="mb-3">
        <Form.Group as={Col} controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control size="sm" type="text" placeholder="Title"  onChange={handleChange}  name="title"  />
        </Form.Group>
        <Form.Group as={Col} controlId="Description">
        <Form.Label>Description</Form.Label>
        <Form.Control size="sm" type="text" placeholder="Description" onChange={handleChange} name="description"    />
      </Form.Group>
        <Form.Group as={Col} controlId="Category">
          <Form.Label>Category</Form.Label>
          <Form.Select size="sm" defaultValue="Select category"  onChange={handleChange}  name="category"  >
            <option>Smartphones & Tablets</option>
            <option>Fashion & Clothing</option>
            <option>Decor & Furniture</option>
            <option>Home & Kitchen</option>
            <option>Tv & Audios</option>
            <option>Watches & Eyewear</option>
            <option>Camera & Photo</option>
            <option>Computer & Desktop</option>
            <option>Groceries</option>
          </Form.Select>
        </Form.Group>
       
      </Row>
      <Row className="mb-2">
    
      <Form.Group as={Col} controlId="Image">
        <Form.Label>Image</Form.Label>
        <Form.Control  size="sm" type="file"  name="image" placeholder="Image" onChange={handleImage}  accept=".png, .jpg, .jpeg, avif" />
      </Form.Group>

      {/* <Form.Group as={Col} controlId="Avatar">
        <Form.Label>Avatar</Form.Label>
        <Form.Control  size="md" type="file"  name="avatar" placeholder="Avatar" onChange={handleAvatar} encType ="multipart/form-data" accept=".png, .jpg, .jpeg, avif"  />
      </Form.Group>
       
      */}

      <Form.Group as={Col} controlId="Status">
          <Form.Label>Status</Form.Label>
          
          <Form.Control size="sm" type="text" placeholder="Status"  onChange={handleChange}  name="status"  />
        </Form.Group>
       
        </Row >
     

      <Row className="mb-3">
        <Form.Group as={Col} controlId="Price">
          <Form.Label>Price</Form.Label>
          <Form.Control size="sm" type="text" placeholder="Price"   name="price" onChange={handleChange}  />
        </Form.Group>

        
        <Form.Group as={Col} controlId="Quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control size="sm" type="text" placeholder="Quantity"   name="quantity" onChange={handleChange}  />
        </Form.Group>

        <Form.Group as={Col} controlId="Discount">
          <Form.Label>discount</Form.Label>
          <Form.Control size="sm" type="text" placeholder="Discount"  onChange={handleChange}  name="discount"  />
        </Form.Group>
      </Row>
      <Row className="mb-3">
       
        <Form.Group as={Col} controlId="Trending">
          <Form.Label>Trending</Form.Label>
          <Form.Select size="sm"    onChange={handleChange}  name="trending"  >
            <option>true</option>
            <option>false</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="TopFeatured">
          <Form.Label>Top Featured</Form.Label>
          <Form.Select size="sm" defaultValue="Select Top featured"   onChange={handleChange}  name="topfeatured"  >
            <option>true</option>
            <option>false</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="Recommended">
          <Form.Label>Recommended</Form.Label>
          <Form.Select defaultValue="Select Recommended deals"   onChange={handleChange}  name="recommended">
            <option>true</option>
            <option>false</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="Topdeals">
          <Form.Label>Top deals</Form.Label>
          <Form.Select  defaultValue="Select Top deals"    onChange={handleChange}  name="topdeals">
            <option>true</option>
            <option>false</option>
          </Form.Select>
        </Form.Group>

       
      </Row>

      <div className="d-grid gap-2 col-2 mx-auto">
      <Button className="" onClick={handleSubmit}      variant="outline-dark" type="submit">
      {isLoading ? 'Loading…' : 'Click to add item'}
      </Button>
      </div>
    </Form>
    </Container>) : (<p>Please <a href="/login">Login</a> to Add items</p>)}
     
        </section>
  )
}

export default Additem;