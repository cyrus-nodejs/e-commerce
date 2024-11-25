/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Container from 'react-bootstrap/Container';
 
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

import { useParams } from 'react-router-dom';
import {  useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/app/hook';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchResetPassword, getMessage } from '../../redux/features/auth/authSlice';

const ResetPassword = () => {
  const {id} = useParams()
  const dispatch = useAppDispatch()
  const message = useAppSelector(getMessage)
  const [submitting, setSubmitting] = useState(false);


   
interface FormValues {
  password: string;
  confirmPassword: string;
  token:id
}




  const validationSchema = Yup.object().shape({
  
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
      dispatch(fetchResetPassword(values))
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
      confirmPassword:"",
      token:id
    },
    validationSchema,
    onSubmit: handleSubmit,
  });


  return (
   
    <section>
    <Container fluid>
   
<center>
<div   className="d-inline-flex px-5 mx-5">
<div >
         
<p className="text-center text-dark fs-4 fw-normal">Reset your password.</p>           
  <p className="text-center text-dark fs-5 fw-normal">Reset your password.
  Last step. Enter your password, and you are set. Thanks!</p>
  <Form onSubmit={formik.handleSubmit}>
      <Form.Control size="lg"  required   value={formik.values.password}  onChange={formik.handleChange} style={{}} name="password"     type="password" placeholder="Password" />
      {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
      <br />
      <Form.Control size="lg"  required className="shadow-none"   value={formik.values.confirmPassword}  onChange={formik.handleChange} style={{}} name="confirmPassword"     type="password" placeholder="Confirm Password" />
       {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="error">{formik.errors.confirmPassword}</div>
          )}
      <br />
                <div className="d-grid gap-2">
             <Button type="submit" disabled={submitting}  variant="success" style={{margin:"20px 0px"}} size="lg"  >Reset Password</Button>
               </div> 

               </Form>
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


