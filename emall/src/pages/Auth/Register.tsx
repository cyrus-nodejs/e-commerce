
import { useNavigate,  Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {  useState } from 'react';
import axios from "axios"

import Stack from 'react-bootstrap/Stack';



const Register = ( ) => {
  const navigate = useNavigate()
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("") 
  
  
  
    const handleSubmit = async (e: { preventDefault: () => void}) => {
      e.preventDefault();
   
      try {
        const { data } = await axios.post(
          "https://emall-server.onrender.com/register",
          {
            username,
            password,
            email,
          },
        );
        const { success, message } = data;
        if (success) {
          alert(message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
         console.log(message);
        }
      } catch (error) {
        console.log(error);
      }
      
    }


  return (
    
    <section>
    <Container fluid>
<Link to="/" className="p-2 navbar fs-3 text-decoration-none text-reset text-danger">E-MALL</Link>
<Stack gap={3}  className="col-md-3 mx-auto">
 <div >

                
  <h4 style={{textAlign:"center"}}>Create a account</h4>
  
  <Form.Control required onChange={e =>{setUserName(e.target.value)}} style={{}}  name="username"  size="lg" type="text" placeholder="Username" />
      <br />
      <Form.Control required onChange={e =>{setEmail(e.target.value)} } style={{}} name="email"  size="lg" type="email" placeholder="Email" />
      <br />
      <Form.Control required onChange={e => {setPassword(e.target.value)}} style={{}} name="password" size="lg" type="password" placeholder="Password" />
      
      <div className="d-grid gap-2">
    
    <Button variant="outline-success" style={{margin:"20px 0px"}} size="lg"   onClick={e =>handleSubmit(e) }    >Sign up</Button>
     </div>
     <Stack direction="horizontal" gap={1}>
      <div className="p-2 loginp"  > <p className="fs-6 "> Already registered?  <a href="/login" style={{color:'red', textDecoration:'none', }}>Please sign in</a></p></div>
    </Stack>
     
</div>
 </Stack>
</Container>

    </section>
  )
}

export default Register;