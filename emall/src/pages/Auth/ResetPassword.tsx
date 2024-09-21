/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Container from 'react-bootstrap/Container';
 
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {  MouseEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ResetPassword = () => {
  const {id} = useParams()
  // const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    // const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState('')
    const [prompt, setPrompt] = useState("")
    const [isValid, setIsValid] = useState(false)
    
    const token = id
    
 const  validateForm = () => {
 if (username == confirmPassword){
       setPrompt("Password matched!")
       setIsValid(true)
 }else{
  setPrompt("Password does not matched")
 }

 }

 useEffect(() =>{
  validateForm();
  
    }, [])
 
   const handleSubmit = async (e: MouseEvent<HTMLButtonElement, MouseEvent>)  => {
    e.preventDefault();
    try {
     const { data } = await axios.post(
       `http://localhost:3000/resetpassword`,
       {
        username,
        token,
         password,
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
    console.log(error);
   }

 }

console.log(password)
console.log(confirmPassword)

  return (
   
    <section>
    <Container fluid>
   
<center>
<div   className="d-inline-flex px-5 mx-5">
<div >
         
                
  <p className="text-center text-dark fs-1 fw-normal">Reset password!</p>
     {/* <Form.Control className="shadow-none" required size="lg" type="text" placeholder="Enter Username" name="username"  onChange={e => {setUsername(e.target.value)} } />
      <br /> */}
      <Form.Control className="shadow-none" required size="lg" type="text" placeholder="Enter new Password" name="password"  onChange={e => {setPassword(e.target.value)} } />
      <br />
      {/* <Form.Control className="shadow-none" required size="lg" type="text" placeholder="Confirm new Password" name="password"  onChange={e => {setConfirmPassword(e.target.value)} } /> */}
      <p className="text-danger text-center">{prompt}</p>
      {isValid && (<div><div className="d-grid gap-2">
     <Button variant="outline-success" style={{margin:"20px 0px"}} size="lg"   onClick={e =>handleSubmit(e) }>Reset Password</Button>
    </div></div>)}
      
    <div class="ms-auto fs-4 p-2"><p className="fs-6 mr-4 ">  <a href="/Login" className="text-decoration-none text-reset fs-5">Login</a></p></div>
    <p className="text-danger text-center">{message}</p>
   
</div>
    
    

     
      
</div>


</center>
</Container>

    </section>
 )
}

export default ResetPassword;


