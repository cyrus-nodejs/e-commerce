
import { Container, Button, Stack, Form } from 'react-bootstrap';
import {  useState } from 'react';


import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../redux/app/hook';
import { fetchAddCustomerService, getMessage } from '../../../redux/features/auth/authSlice';




const AssignCustomerService = ( ) => {
  const dispatch = useAppDispatch()
  const message = useAppSelector(getMessage)
  const [submitting, setSubmitting] = useState(false);

  
  interface FormValues {

    email: string;

  
  }
  
  
  
  
    const validationSchema = Yup.object().shape({
     
     email: Yup.string().email('Invalid email').required('Email is required'),
     
     });
  
    const handleSubmit = async (values: FormValues) => {
      try {
        setSubmitting(true);
        dispatch(fetchAddCustomerService(values))
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
      
        email: '',
      
      },
      validationSchema,
      onSubmit: handleSubmit,
    });
  
   
  
  return (
    
    <section>
    <Container fluid>

<div className=" d-flex ">
 <div className="ms-auto  me-auto" >
            
  <p className='text-center fs-3  fw-medium'>Add customer service role</p>
  
  <Form onSubmit={formik.handleSubmit}>
  
      <Form.Control size="lg" className="shadow-none"  required  value={formik.values.email} onChange={formik.handleChange} style={{}} name="email"   type="email" placeholder="Email" />
      {formik.touched.email && formik.errors.email && (
            <div className="error ">{formik.errors.email}</div>
          )}
      <br />
     
     
      <div className="d-grid gap-2">
    
    <Button className="" variant="outline-primary" type="submit" disabled={submitting} style={{margin:"20px 0px"}} size="lg"      >Grant customer service access!</Button>
   
     </div>
     </Form>
     <Stack direction="horizontal" gap={1}>
      
      <p className="text-danger mt-2 fs-5 text-center">{message}</p> 
    </Stack>
  
</div>
 </div>
</Container>

    </section>
  )
}

export default AssignCustomerService;