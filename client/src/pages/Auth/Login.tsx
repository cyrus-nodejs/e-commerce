
 import { useNavigate, Navigate} from 'react-router-dom';
import { redirect } from 'react-router-dom';
import {Form, Container,  Button} from "react-bootstrap"

 import { useFormik } from 'formik';
 import * as Yup from 'yup';
 
 
 import {  useState, useEffect} from 'react';
 import { useAppDispatch, useAppSelector } from '../../redux/app/hook';
 import { getMessage,   fetchLogin, getAuthUser,   getIsAuthenticated } from '../../redux/features/auth/authSlice';

    const BASEURL = import.meta.env.VITE_APP_BASE_URL

 const Login = () => {
 
   
  const navigate = useNavigate()
  
  
    const isAuthenticated = useAppSelector(getIsAuthenticated)
      const user = useAppSelector(getAuthUser)
    

      
    const dispatch = useAppDispatch()
  const message = useAppSelector(getMessage)
  const [submitting, setSubmitting] = useState(false);



interface FormValues {
  password: string;
  username:string,
}

 const loginWithGoogle = () => {
    window.open(`${BASEURL}/auth/google`, '_self');
  };



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
        if (isAuthenticated ){
          navigate('/')
        }else{
          redirect("/login")
        }

          }, [isAuthenticated,  navigate])
  
          
          
         
    
   return (
    
     <section>
     <Container fluid>
    
 
 <div   className="d-flex justify-content-center my-3">
  
 <div className="" >
 {isAuthenticated && user &&(
          <Navigate to="/" replace={true} />
        )}
                 
   <p className="text-center  fs-2 ">Login</p>
   <Form onSubmit={formik.handleSubmit}>
   <Form.Group controlId="formName">
      <Form.Control size="lg" className='shadow-none' required  value={formik.values.username} onChange={formik.handleChange} style={{}} name="username"   type="email" placeholder="Email" />
      {formik.touched.username && formik.errors.username && (
            <div className="error ">{formik.errors.username}</div>
          )}
     
      <br />
      <Form.Control size="lg" className='shadow-none'  required   value={formik.values.password}  onChange={formik.handleChange} style={{}} name="password"     type="password" placeholder="Password" />
      {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
      <br />
                <div className="d-grid gap-2">
             <Button type="submit" disabled={submitting}  variant="outline-primary" style={{margin:"20px 0px"}} size="lg"  >Sign in</Button>
               </div> 
               </Form.Group>
               <Form.Control.Feedback type="invalid">
      {message}
    </Form.Control.Feedback>
               </Form>
              
          <button onClick={loginWithGoogle}>Login with Google</button>
        
               <div className="d-flex mb-3">
           <div className="p-2"><a href="/forgotpassword" style={{color:'red', textDecoration:'none'}}><p style={{color:'red', textDecoration:'none'}}>Forgot password?</p></a></div>
           
           <div className="ms-auto p-2"><p className="fs-6 mr-4 "> Don't have an account?  <a href="/register" style={{color:'red', textDecoration:'none'}}>Sign up</a></p></div>

          </div>
             
              
          
          {/* <p className="text-danger mt-2 fs-5 text-center">{message}</p>  
      */}
 </div>
 </div>
 
 
 </Container>
 
     </section>
  )
 }

 export default Login;



