

import Stack from 'react-bootstrap/Stack';
 import Container from 'react-bootstrap/Container';
 import Login from './Auth/Login';
 import Button from 'react-bootstrap/Button';
 
 import Form from 'react-bootstrap/Form';
 import axios from 'axios';
 import { AuthContext } from '../Context/auth';
 import {  useState, useContext } from 'react';


 const RetrievePayment = () => {
  const {  isAuthenticated} = useContext(AuthContext)
     
     const [orderId, setOrderId] = useState("")
    
     const [message, setMessage] = useState('')
     
     
   
  
    const handleSubmit = async (e: React.SyntheticEvent)  => {
     e.preventDefault();
     try {
      const { data } = await axios.post(
        "http://localhost:3000/retrievepayment",
        {
        orderId
        },
        {withCredentials: true}
      );
      
      const { success, message} = data;
      if (success) {
        
        alert(message);
        setMessage(message)
        
    
      console.log(message)
        
      } else {
       alert(message);
       console.log(message)
       
      }
    } catch (error) {
      alert(error)
    }
    
  
    

  }

   return (
    
     <section>
     <Container fluid>
    
 
 <Stack gap={3} style={{}}  className="col-md-3 mx-auto">
 <div >
 {isAuthenticated ? (
        
                <div> 
   <h2 style={{textAlign:"center"}}>Retrieve Payment</h2>
      <Form.Control required size="lg" type="text" placeholder="Enter orderId" name="orderId"  onChange={e => {setOrderId(e.target.value)} } />
       <br />
       
       <div className="d-grid gap-2">
    <Button variant="outline-success" style={{margin:"20px 0px"}} size="lg"   onClick={e =>handleSubmit(e) }>Retrieve Payment</Button>
     </div>
     <Stack direction="horizontal" gap={1}>
   
      <div className="p-2 loginp"> <p className="text-danger fs-4">{message}</p>    </div>
    
    </Stack>
     
      
       
</div>
) : (<div><Login/></div>)
}
</div>
 </Stack>
 
 
 </Container>
 
     </section>
   )
 }
 export default RetrievePayment;



