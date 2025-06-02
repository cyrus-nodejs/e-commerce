
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../redux/app/hook";
import { fetchAsyncUser, getIsAuthenticated, getAuthUser } from '../../../redux/features/auth/authSlice';

// import { fetchAdminAddCategory } from '../../../redux/features/items/itemSlice';
import Navbar from '../../../components/Navbar/Navbar';

const BASEURL = import.meta.env.VITE_APP_BASE_URL   

const AddCategory = () => {
  const  dispatch = useAppDispatch()

  const authUser = useAppSelector(getAuthUser)
  const [message, setMessage] = useState("");
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  
  useEffect(() =>{
    dispatch(fetchAsyncUser())
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [dispatch])


    const [state, setState] = useState({
     title:"",
       image:"", 
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
    formData.append("image", state.image);
    const response = await axios.post(`${BASEURL}/admin/add-category`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
       withCredentials:true,
      });
      setMessage(response.data.message)
      console.log('server response:', response.data);
  }

   
   
  return (
    <section className="mx-5 py-2 border ">
      {isAuthenticated && authUser?.role === "customer service" ? ( <Container fluid>
<Navbar />
        <p className="fs-3 text-center">Upload Category type</p>
     <Form encType="multipart/form-data">
      <Row className="mb-3">
        <Form.Group as={Col} controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control size="sm" type="text" placeholder="Title"  onChange={handleChange}  name="title"  />
        </Form.Group>
       
       
       
      </Row>
      <Row className="mb-2">
    
      <Form.Group as={Col} controlId="Image">
        <Form.Label>Image</Form.Label>
        <Form.Control  size="sm" type="file"  name="image" placeholder="Image" onChange={handleImage}  accept=".png, .jpg, .jpeg, avif" />
      </Form.Group>

     

        
        </Row >
     

        <p className='text-danger text-end '>{message} <i className='bx bx-check'></i></p>

      <div className="d-grid gap-2 col-2 mx-auto">
      <Button className="" onClick={handleSubmit}      variant="outline-dark" type="submit">
      {isLoading ? 'Loading…' : ' Add Category'}
      </Button>
      
      </div>
    </Form>
    </Container>) : (<p className='fs-1 text-center'>You do not have require permission!</p>)}
     
        </section>
  )
}

export default AddCategory;