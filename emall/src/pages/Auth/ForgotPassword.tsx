

 import Container from 'react-bootstrap/Container';
 
 import Button from 'react-bootstrap/Button';
 
 import Form from 'react-bootstrap/Form';
 import axios from 'axios';
import {  useState } from 'react';
 

 const ForgotPassword = () => {
   
     const [email, setEmail] = useState("")

     const [message, setMessage] = useState('')
     
     
   
  
    const handleSubmit = async (e: { preventDefault: () => void})  => {
     e.preventDefault();
     try {
      const { data } = await axios.post(
        `https://server-sable-beta-77.vercel.app/forgotpassword`,
        {
          email
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
    
 <center>
 <div   className="d-inline-flex px-5 mx-5">
 <div >
          
                 
   <p className="text-center text-dark fs-1 fw-normal">Forgot Password!</p>
      <Form.Control className="shadow-none" required size="lg" type="text" placeholder="Enter Email" name="email"  onChange={e => {setEmail(e.target.value)} } />
       <br />
     
       <div className="d-grid gap-2">
    <Button variant="outline-success" style={{margin:"20px 0px"}} size="lg"   onClick={e =>handleSubmit(e) }>Recieve Reset Link</Button>
     </div>
     
     
     <div className="d-flex mb-3">
  <div className="p-2"><p style={{color:'red', textDecoration:'none'}}>{message}</p></div>
  
  
</div>
     
     
 
      
       
 </div>
 </div>
 
 </center>
 </Container>
 
     </section>
  )
 }

 export default ForgotPassword;



