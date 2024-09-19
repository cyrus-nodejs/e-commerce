
 import {  redirect, Navigate} from 'react-router-dom';

 import Container from 'react-bootstrap/Container';
 
 import Button from 'react-bootstrap/Button';
 
 import Form from 'react-bootstrap/Form';
 import axios from 'axios';
 import { AuthContext } from '../../Context/auth';
 import {  useState, useContext } from 'react';


 const Login = () => {
  const { setIsAuthenticated, isAuthenticated} = useContext(AuthContext)
     
     const [username, setUserName] = useState("")
     const [password, setPassword] = useState("") 
     const [message, setMessage] = useState('')
     
     
   
  
    const handleSubmit = async (e: { preventDefault: () => void})  => {
     e.preventDefault();
     try {
      const { data } = await axios.post(
        "https://emall-server.onrender.com/login",
        {
          username,
          password,
        },
        {withCredentials: true}
      );
      
      const { success, message} = data;
      if (success) {
        setIsAuthenticated(true)
        redirect(window.location.href)
        alert(message);
        setMessage(message)
        
    
      console.log(message)
        
      } else {
    
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
 {isAuthenticated && (
          <Navigate to="/" replace={true} />
        )}
                 
   <p className="text-center text-dark fs-1 fw-normal">Login</p>
      <Form.Control className="shadow-none" required size="lg" type="text" placeholder="username" name="username"  onChange={e => {setUserName(e.target.value)} } />
       <br />
       <Form.Control className="shadow-none" required size="lg" type="password" name="password" placeholder="Password" onChange={e => {setPassword(e.target.value)}}  />
       <div className="d-grid gap-2">
    <Button variant="outline-success" style={{margin:"20px 0px"}} size="lg"   onClick={e =>handleSubmit(e) }>Sign in</Button>
     </div>
     
     
     <div className="d-flex mb-3">
  <div className="p-2"><a href="/forgotpassword" style={{color:'red', textDecoration:'none'}}><p style={{color:'red', textDecoration:'none'}}>Forgot password?</p></a></div>
  
  <div className="ms-auto p-2"><p className="fs-6 mr-4 "> Don't have an account?  <a href="/register" style={{color:'red', textDecoration:'none'}}>Sign up</a></p></div>
<p className="text-danger text-center">{message}</p>
</div>
     
     
 
      
       
 </div>
 </div>
 
 </center>
 </Container>
 
     </section>
  )
 }

 export default Login;



