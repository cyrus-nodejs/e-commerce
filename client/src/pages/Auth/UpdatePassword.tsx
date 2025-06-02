
// import {  redirect, Navigate} from 'react-router-dom';

// import Container from 'react-bootstrap/Container';

// import Button from 'react-bootstrap/Button';

// import Form from 'react-bootstrap/Form';
// import axios from 'axios';
// import { AuthContext } from '../../Context/auth';
// import {  useState, useContext } from 'react';


// const UpdatePassword = () => {
//  const { setIsAuthenticated, isAuthenticated} = useContext(AuthContext)
    
  
//     const [oldPassword, setOldPassword] = useState("") 
      
//     const [newPassword, setNewPassword] = useState("") 
//     const [message, setMessage] = useState('')
    
    
  
 
//    const handleSubmit = async (e: { preventDefault: () => void})  => {
//     e.preventDefault();
//     try {
//      const { data } = await axios.post(
//        "https://emall-server.onrender.com/updatepassword",
//        {
//          oldPassword,
//          newPassword,
//        },
//        {withCredentials: true}
//      );
     
//      const { success, message} = data;
//      if (success) {
//        setIsAuthenticated(true)
//        redirect(window.location.href)
       
//        setMessage(message)
       
   
//      console.log(message)
       
//      } else {
    
//       console.log(message)
      
//      }
//    } catch (error) {
//      console.log(error)
//    }
   
 
   

//  }

//   return (
   
//     <section>
//     <Container fluid>
   
// <center>
// <div   className="d-inline-flex px-5 mx-5">
// <div >
// {isAuthenticated && (
//          <Navigate to="/" replace={true} />
//        )}
                
//   <p className="text-center text-dark fs-1 fw-normal">Update Password</p>
//      <Form.Control className="shadow-none" required size="lg" type="text" placeholder="oldpassword" name="oldpassword"  onChange={e => {setOldPassword(e.target.value)} } />
//       <br />
//       <Form.Control className="shadow-none" required size="lg" type="password" name="newpassword" placeholder="newpassword" onChange={e => {setNewPassword(e.target.value)}}  />
//       <div className="d-grid gap-2">
//    <Button variant="outline-success" style={{margin:"20px 0px"}} size="lg"   onClick={e =>handleSubmit(e) }>Update</Button>
//     </div>
    
    
//     <div className="d-flex mb-3">
//  <div className="p-2"><a href="/forgotpassword" style={{color:'red', textDecoration:'none'}}><p style={{color:'red', textDecoration:'none'}}>{message}</p></a></div>
 


// </div>
    
    

     
      
// </div>
// </div>

// </center>
// </Container>

//     </section>
//  )
// }

// export default UpdatePassword;



