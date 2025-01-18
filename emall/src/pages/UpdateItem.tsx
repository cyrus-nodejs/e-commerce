/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Form, Container, Col, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react"
import { fetchGetItemById, fetchUpdateItem, getOneItem } from "../redux/features/items/itemSlice"
import { useAppSelector, useAppDispatch } from "../redux/app/hook"
import { useParams } from "react-router-dom";
import { fetchAsyncUser, getAuthUser, getIsAuthenticated } from "../redux/features/auth/authSlice";
import Navbar from "../components/Navbar/Navbar";

const UpdateItem = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let data;
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const authUser = useAppSelector(getAuthUser)
    const isAuthenticated = useAppSelector(getIsAuthenticated)
    const getItem = useAppSelector(getOneItem)
    const [state, setState] = useState({
        title:"",
        description:"",
          image:"",
           category:"",
         price:'',
         quantity:'',
          trending:"",
             recommended:"",
             topfeatured:"",
            topdeals:"",
            discount:'',
            status:"",
           
            
      })
      useEffect(() => {
        // Fetch the item data based on ID
       dispatch(fetchAsyncUser())
        
      }, [dispatch]);
  
      console.log(getItem)
      useEffect(() => {
        // Fetch the item data based on ID
       dispatch(fetchGetItemById(id))
        setState(getItem)
      }, [dispatch, getItem, id]);
  

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

setState((prevState)=>({...prevState, [e.target.name] : e.target.value}))
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
        
       
      
       
  dispatch(fetchUpdateItem(data={id, formData}))
    .then(response => {
      alert(response)
      alert("Item saved successfully!")
    })
    .catch(err =>{
      console.log(err)
      alert('Not saved!')
    })
  }

   

      return (
        <section className="mx-5 py-2 border ">
        {isAuthenticated && authUser?.role === 'customer service' ? ( <Container fluid>
  <Navbar />
          <p className="fs-3 text-center">Update Item</p>
       <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control size="sm" type="text" placeholder="Title" value={state.title}  onChange={handleChange}  name="title"  />
          </Form.Group>
          <Form.Group as={Col} controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control size="sm" type="text" placeholder="Description" value={state.description}  onChange={handleChange} name="description"    />
        </Form.Group>
          <Form.Group as={Col} controlId="Category">
            <Form.Label>Category</Form.Label>
            <Form.Select size="sm" defaultValue="Select category" value={state.category}  onChange={handleChange}  name="category"  >
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
          <Form.Control  size="sm" type="file"    name="image" placeholder="Image" onChange={handleImage}  accept=".png, .jpg, .jpeg, avif" />
        </Form.Group>
  
        {/* <Form.Group as={Col} controlId="Avatar">
          <Form.Label>Avatar</Form.Label>
          <Form.Control  size="md" type="file"  name="avatar" placeholder="Avatar" onChange={handleAvatar} encType ="multipart/form-data" accept=".png, .jpg, .jpeg, avif"  />
        </Form.Group>
         
        */}
  
        <Form.Group as={Col} controlId="Status">
            <Form.Label>Status</Form.Label>
            <Form.Control size="sm" type="text" placeholder="Status" value={state.status}  onChange={handleChange}  name="status"  />
          </Form.Group>
         
          </Row >
       
  
        <Row className="mb-3">
          <Form.Group as={Col} controlId="Price">
            <Form.Label>Price</Form.Label>
            <Form.Control size="sm" type="text" placeholder="Price" value={state.price}   name="price" onChange={handleChange}  />
          </Form.Group>
  
          
          <Form.Group as={Col} controlId="Quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control size="sm" type="text" placeholder="Quantity" value={state.quantity}   name="quantity" onChange={handleChange}  />
          </Form.Group>
  
          <Form.Group as={Col} controlId="Discount">
            <Form.Label>discount</Form.Label>
            <Form.Control size="sm" type="text" placeholder="Discount" value={state.discount}  onChange={handleChange}  name="discount"  />
          </Form.Group>
        </Row>
        <Row className="mb-3">
         
          <Form.Group as={Col} controlId="Trending">
            <Form.Label>Trending</Form.Label>
            <Form.Select size="sm"    onChange={handleChange} value={state.trending}  name="trending"  >
              <option>true</option>
              <option>false</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="TopFeatured">
            <Form.Label>Top Featured</Form.Label>
            <Form.Select size="sm" defaultValue="Select Top featured" value={state.topfeatured}   onChange={handleChange}  name="topfeatured"  >
              <option>true</option>
              <option>false</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="Recommended">
            <Form.Label>Recommended</Form.Label>
            <Form.Select defaultValue="Select Recommended deals"   onChange={handleChange} value={state.recommended}  name="recommended">
              <option>true</option>
              <option>false</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="Topdeals">
            <Form.Label>Top deals</Form.Label>
            <Form.Select  defaultValue="Select Top deals"    onChange={handleChange} value={state.topdeals}   name="topdeals">
              <option>true</option>
              <option>false</option>
            </Form.Select>
          </Form.Group>
  
         
        </Row>
  
        <div className="d-grid gap-2 col-2 mx-auto">
        <Button className="" onClick={handleSubmit}      variant="outline-dark" type="submit">
        {isLoading ? 'Loading…' : 'Update Item'}
        </Button>
        </div>
      </Form>
      </Container>) : (<p className='fs-1'>Access Denied!</p>)}
       
          </section>
  )
}

export default UpdateItem