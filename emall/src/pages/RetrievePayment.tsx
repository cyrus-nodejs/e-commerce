


 import {Container, Button} from 'react-bootstrap'
 import Login from './Auth/Login';
 
 
 import Form from 'react-bootstrap/Form';

 import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
 import { useAppDispatch, useAppSelector } from "../redux/app/hook";
 import { fetchAsyncUser, getIsAuthenticated, getAuthUser } from '../redux/features/auth/authSlice';
 import { fetchRetrievePayment, getMessage } from '../redux/features/order/orderSlice';
 

 const RetrievePayment = () => {
 
    const dispatch = useAppDispatch()
       
  const user = useAppSelector(getAuthUser)
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const message = useAppSelector(getMessage)
  const [submitting, setSubmitting] = useState(false);



interface FormValues {
orderId:string
}




  const validationSchema = Yup.object().shape({
   orderId: Yup.string()
   });

  const handleSubmit = async (values: FormValues) => {
    try {
      setSubmitting(true);
      dispatch(fetchRetrievePayment(values))
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
      orderId: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });


 
  useEffect(() =>{
    dispatch(fetchAsyncUser())
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [dispatch])
   
  
   

   return (
    
     <section>
     <Container fluid>
    
 
     <center>
 <div   className="d-inline-flex px-5 mx-5">
  
 {isAuthenticated  && user ? (
        
                <div> 
   <h2 style={{textAlign:"center"}}>Retrieve Payment</h2>
   <Form onSubmit={formik.handleSubmit}>
      <Form.Control size="lg"  required  value={formik.values.orderId} onChange={formik.handleChange} style={{}} name="orderId"   type="email" placeholder="Email" />
      {formik.touched.orderId && formik.errors.orderId && (
            <div className="error ">{formik.errors.orderId}</div>
          )}
     
      <br />
      
                <div className="d-grid gap-2">
             <Button type="submit" disabled={submitting}  variant="outline-info" style={{margin:"20px 0px"}} size="lg"  >Sign in</Button>
               </div> 

               </Form>
               <p className="text-danger mt-2 fs-5 text-center">{message}</p>  
</div>
) : (<div><Login/></div>)
}
</div>
 </center>
 
 
 </Container>
 
     </section>
   )
 }
 export default RetrievePayment;



