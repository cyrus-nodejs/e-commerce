/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {Container, Row, Col,  Button, Form, } from "react-bootstrap"

import "../index.css"
import  { useState,  useEffect} from 'react'
import Navbar from "../components/Navbar/Navbar"
import { fetchAddress } from "../redux/features/address/addressSlice";

import { useGetCountry } from 'react-country-list';
import {
  SyntheticEvent,

} from 'react';


import { getAddress, fetchUpdateAddress } from "../redux/features/address/addressSlice"

import { useAppSelector, useAppDispatch } from "../redux/app/hook"
const AddressForm = () => {
  
  const dispatch = useAppDispatch()

  const destination  = useAppSelector(getAddress)
  
 

    const [country, setCountry] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [city, setCity] = useState<string>();
    const [isLoading, setLoading] = useState(false);
    
    const { cityList, stateList, countryList } = useGetCountry({
      country,
      state,
      city,
    });

    
    useEffect(() => {
      dispatch(fetchAddress())
      setData(destination)
     }, [destination, dispatch]);
        console.log(destination)
 
     
    const [data, setData] = useState({
      firstname:"",
      lastname:"",
        mobile:"",
         mobile2:"",
       address:"",
       ordernote:"",
        country:"",
           city:"",
           region:"",
           postalcode:"",
    })
   
    const handleCountryChange = (
      e: SyntheticEvent<HTMLSelectElement>,
      type: string
    ) => {
      const value = e.currentTarget.value;
      if (type === 'country') setCountry(value);
      if (type === 'state') setState(value);
      if (type === 'city') setCity(value);
    };


   
   
    
  
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const handleChange = (e: { preventDefault: () => void; target: { name: any; value: any } }) => {
e.preventDefault();
// setData({...data, [e.target.name] : e.target.value})
setData((prevState)=>({...prevState, [e.target.name] : e.target.value}))
 }

 
 const handleSubmit = async (e: { preventDefault: () => void; }) => {
  e.preventDefault();
 
  setLoading(true)
 
 
 
  const formData = new FormData;
  formData.append("firstname", data.firstname)
  formData.append("lastname", data.lastname)
    formData.append("mobile", data.mobile);
 formData.append("mobile2", data.mobile2)
   formData.append("address", data.address)
   formData.append("ordernote", data.ordernote)
      formData.append("region",  data.region)
      formData.append("postalcode", data.postalcode)
     
      
     
dispatch(fetchUpdateAddress(formData))
  .then(response => {
    alert(response)
    alert("Item saved successfully!")
  })
  .catch(err =>{
    console.log(err)
    alert('Not saved!')
  })
}

 



 useEffect(() => {
  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  if (isLoading) {
    simulateNetworkRequest().then(() => {
      setLoading(false);
    });
  }
}, [isLoading]);
   
  return (
   
    <section>
      <Navbar />
       <Container className='home' fluid>

      <Row className="px-5">
        <Col  sm={9}>
        <h5>Customer Adress:</h5>
  
    <div>
    <Row className="mb-3">
    
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Firstname</Form.Label>
      <Form.Control required  onChange={handleChange} type="text" name="firstname" placeholder={destination?.firstname}    />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Lastname</Form.Label>
      <Form.Control required   onChange={handleChange} type="text" name="lastname" placeholder={destination?.lastname} />
    </Form.Group>
  </Row>
  <Row className="mb-3">
  <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
    <Form.Label>Mobile</Form.Label>
    <Form.Control required  onChange={handleChange} name="mobile" placeholder={destination?.mobile} />
  </Form.Group>

  <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
    <Form.Label>Additional Mobile</Form.Label>
    <Form.Control required  onChange={handleChange} name="mobile2" placeholder={destination?.mobile2} />
  </Form.Group>
  </Row>
  

  <Row className="mb-3">
  <Form.Group as={Col} className="mb-3" controlId="country">
    <Form.Label>Country</Form.Label>
    <Form.Select 
    aria-label="Default select example"
    name="country"
    onChange={(e:never) =>
      { handleCountryChange(e, 'country');
       handleChange(e) }
     }
    
    
    className="shadow-none"
    >
  
    <option>select country</option>
    {countryList.map((country) => {
      return <option key={country.name}>{country.name}</option>;
    })}
  
  </Form.Select>
</Form.Group>

<Form.Group as={Col} className="mb-3" controlId="state">
    <Form.Label>State</Form.Label>
    <Form.Select aria-label="Default select example"
     name="region"
     onChange={(e:never) =>
      { handleCountryChange(e, 'state');
       handleChange(e) }
     }
    
     
     className="shadow-none"
    >
    <option>select state</option>
    {stateList.map((state) => {
      return <option key={state.name}>{state.name}</option>;
    })}
  
  </Form.Select>
  </Form.Group>


  <Form.Group  as={Col}  className="mb-3" controlId="city">
    <Form.Label>City</Form.Label>
    <Form.Select aria-label="Default select example"
     name="city"
     
     onChange={(e:never) =>
      { handleCountryChange(e, 'city');
       handleChange(e) }
     }
    
    className="shadow-none"
    >
  
    <option>select city</option>

    {cityList.map((city) => {
      return <option key={city.name}>{city.name}</option>;
    })}
  
  </Form.Select>
  </Form.Group>
  
  </Row>
  <Row className="mb-3">
  <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Zip/Postal Code</Form.Label>
    <Form.Control onChange={handleChange} required  type="text" name="postalcode" className="shadow-none" placeholder={destination?.postalcode} />
  </Form.Group>
  <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
    <Form.Label>Address </Form.Label>
    <Form.Control onChange={handleChange} required  name="address" placeholder={destination?.address} />
  </Form.Group>
  </Row>

<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Additional Information</Form.Label>
    <Form.Control onChange={handleChange} required  name="ordernote" as="textarea" className="shadow-none" placeholder={destination?.ordernote} rows={4} />
  </Form.Group>


  <div className="d-flex">
    <div className="ms-auto p-2" >
  <Button onClick={handleSubmit} variant="dark"    type="submit">
  {isLoading ? 'Loading…' : 'Update Address'}
  </Button>
  </div>
  </div> 
  </div>
    
  
     
    
       
        </Col>
       
      </Row>
     
    </Container> 
  
    
    </section>
      
 
  )
}

export default AddressForm