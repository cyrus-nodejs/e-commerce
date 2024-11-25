
 import { useNavigate, Navigate} from 'react-router-dom';
import { redirect } from 'react-router-dom';
import {Form, Container,  Button} from "react-bootstrap"

 import { useFormik } from 'formik';
 import * as Yup from 'yup';
 
 
 import {  useState, useEffect} from 'react';
 import { useAppDispatch, useAppSelector } from '../../redux/app/hook';
 import { getMessage,   fetchLogin, getUpdateUser,   getIsAuthenticated } from '../../redux/features/auth/authSlice';


 const Login = () => {
 
   
  const navigate = useNavigate()
  
  
    const isAuthenticated = useAppSelector(getIsAuthenticated)
      const user = useAppSelector(getUpdateUser)
    

      
    const dispatch = useAppDispatch()
  const message = useAppSelector(getMessage)
  const [submitting, setSubmitting] = useState(false);



interface FormValues {
  password: string;
  username:string,
}




  const validationSchema = Yup.object().shape({
   username: Yup.string().email('Invalid email').required('Email is required'),
   password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
   });

  const handleSubmit = async (values: FormValues) => {
    try {
      setSubmitting(true);
      dispatch(fetchLogin(values))
      console.log(values);
      // Set submitting to false after successful submission
      setSubmitting(false);
    } catch (error) {
      // Handle form submission error
      console.error(error);
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      username:"",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });


      useEffect(() =>{
        if (isAuthenticated && user){
          navigate('/')
        }else{
          redirect("/login")
        }

          }, [isAuthenticated, user, navigate])
  
          
          
         
    
   return (
    
     <section>
     <Container fluid>
    
 <center>
 <div   className="d-inline-flex px-5 mx-5">
  
 <div >
 {isAuthenticated && (
          <Navigate to="/" replace={true} />
        )}
                 
   <p className="text-center  fs-3 fw-medium">Login</p>
   <Form onSubmit={formik.handleSubmit}>
      <Form.Control size="lg"  required  value={formik.values.username} onChange={formik.handleChange} style={{}} name="username"   type="email" placeholder="Email" />
      {formik.touched.username && formik.errors.username && (
            <div className="error ">{formik.errors.username}</div>
          )}
     
      <br />
      <Form.Control size="lg"  required   value={formik.values.password}  onChange={formik.handleChange} style={{}} name="password"     type="password" placeholder="Password" />
      {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
      <br />
                <div className="d-grid gap-2">
             <Button type="submit" disabled={submitting}  variant="outline-info" style={{margin:"20px 0px"}} size="lg"  >Sign in</Button>
               </div> 

               </Form>
               <div className="d-flex mb-3">
           <div className="p-2"><a href="/forgotpassword" style={{color:'red', textDecoration:'none'}}><p style={{color:'red', textDecoration:'none'}}>Forgot password?</p></a></div>
           
           <div className="ms-auto p-2"><p className="fs-6 mr-4 "> Don't have an account?  <a href="/register" style={{color:'red', textDecoration:'none'}}>Sign up</a></p></div>

          </div>
             
              
          
          <p className="text-danger mt-2 fs-5 text-center">{message}</p>  
     
 </div>
 </div>
 
 </center>
 </Container>
 
     </section>
  )
 }

 export default Login;



