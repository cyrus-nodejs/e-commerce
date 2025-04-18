
import { Container, Button, Stack, Form } from 'react-bootstrap';
import {  useState , useEffect} from 'react';


import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../redux/app/hook';
import { fetchRegister, getMessage } from '../../redux/features/auth/authSlice';
import { fetchAsyncUser } from '../../redux/features/auth/authSlice';



const Register = ( ) => {
  const dispatch = useAppDispatch()
  const message = useAppSelector(getMessage)
  const [submitting, setSubmitting] = useState(false);
   
  
  interface FormValues {
    firstname: string;
    lastname: string;
    email: string;
    username:string;
    password: string;
    confirmPassword: string;
    role:string
  }
  
  useEffect(() =>{
    dispatch(fetchAsyncUser())
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [dispatch])
  
  
    const validationSchema = Yup.object().shape({
     firstname: Yup.string()
     .min(2, 'Name must be minimum 2')
     .max(100, 'Name must not be more than 100 characters')
     .required('Name is required'),
     lastname: Yup.string()
     .min(2, 'Name must be minimum 2')
     .max(100, 'Name must not be more than 100 characters')
     .required('Name is required'),
     role: Yup.string().required('Please select role'),
     email: Yup.string().email('Invalid email').required('Email is required'),
     password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
     confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
     });
  
    const handleSubmit = async (values: FormValues) => {
      try {
        setSubmitting(true);
        dispatch(fetchRegister(values))
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
        firstname: '',
        lastname: '',
        username:"",
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
      },
      validationSchema,
      onSubmit: handleSubmit,
    });
  
   
  
  return (
    
    <section>
    <Container fluid>

<div className="d-flex justify-content-between my-3">
  <div></div>
 <div className="" >
            
  <p className='text-center fs-3  fw-medium'>Create an account</p>
  
  <Form onSubmit={formik.handleSubmit}>
  <Form.Control size="lg" className="shadow-none"  required  onChange={formik.handleChange} value={formik.values.firstname} style={{}}  name="firstname"type="text"  placeholder="firstname" />
  {formik.touched.firstname && formik.errors.firstname && (
            <div className="error ">{formik.errors.firstname}</div>
          )}
      <br /> 
      <Form.Control size="lg" className="shadow-none"  required onChange={formik.handleChange} value={formik.values.lastname}  style={{}}  name="lastname"   type="text"  placeholder="lastname" />
      {formik.touched.lastname && formik.errors.lastname && (
            <div className="error ">{formik.errors.lastname}</div>
          )}
      <br />
      <Form.Control size="lg" className="shadow-none"  required  value={formik.values.email} onChange={formik.handleChange} style={{}} name="email"   type="email" placeholder="Email" />
      {formik.touched.email && formik.errors.email && (
            <div className="error ">{formik.errors.email}</div>
          )}
      <br />
      <Form.Control size="lg" className="shadow-none" hidden  required  value={formik.values.email} onChange={formik.handleChange} style={{}} name="username"   type="email" placeholder="Email" />
      {formik.touched.email && formik.errors.email && (
            <div className="error ">{formik.errors.email}</div>
          )}
      <br />
   <div><Form.Select size="lg" required className="shadow-none" value={formik.values.role}  onChange={formik.handleChange}  name="role"  >
           
            <option>customer service</option>
            <option>admin</option>
            <option>super admin</option>
           
          </Form.Select>
          { formik.touched.role && formik.errors.role && (
            <div className="error ">{formik.errors.role}</div>
          )}
          </div>
  

      
      
      <Form.Control size="lg" className="shadow-none"  required   value={formik.values.password}  onChange={formik.handleChange} style={{}} name="password"     type="password" placeholder="Password" />
      {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
      <br />
       <Form.Control size="lg" className="shadow-none"  required   value={formik.values.confirmPassword}  onChange={formik.handleChange} style={{}} name="confirmPassword"     type="password" placeholder="Confirm Password" />
       {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="error">{formik.errors.confirmPassword}</div>
          )}
      <br />
     
      <div className="d-grid gap-2">
    
    <Button className="" variant="outline-primary" type="submit" disabled={submitting} style={{margin:"20px 0px"}} size="lg"      >Sign up</Button>
   
     </div>
     </Form>
     <Stack direction="horizontal" gap={1}>
      <div className="p-2 loginp"  > <p className="fs-6 "> Already registered?  <a href="/login" style={{color:'red', textDecoration:'none', }}>  Please sign in</a></p></div>
      <p className="text-danger mt-2 fs-5 text-center">{message}</p> 
    </Stack>
  
</div>
<div></div>
 </div>
</Container>

    </section>
  )
}

export default Register;