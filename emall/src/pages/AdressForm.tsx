/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {Container, Row, Col,  Button, Form, } from "react-bootstrap"


import  { useState,  useEffect} from 'react'
import Navbar from "../components/Navbar/Navbar"
 import { Link } from "react-router-dom"

import { useGetCountry } from 'react-country-list';
import {
  SyntheticEvent,

} from 'react';

import { getCartBills, getCartItems } from "../redux/features/cart/cartSlice"
import { getAddress, fetchUpdateAddress } from "../redux/features/address/addressSlice"
import { getShipping } from "../redux/features/order/orderSlice"

import { useAppSelector, useAppDispatch } from "../redux/app/hook"
const AddressForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let biodata;
  const dispatch = useAppDispatch()

  const destination  = useAppSelector(getAddress)
  
  const cartBills  = useAppSelector(getCartBills)
  const cartItems = useAppSelector(getCartItems)
  const shipping = useAppSelector(getShipping)
  
    

    const [country, setCountry] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [city, setCity] = useState<string>();
    const [isLoading, setLoading] = useState(false);
    
    const { cityList, stateList, countryList } = useGetCountry({
      country,
      state,
      city,
    });

    
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
setData({...data, [e.target.name] : e.target.value})
 }
  const firstname =  data.firstname
  const lastname =  data.lastname
  const mobile = data.mobile
  const mobile2 = data.mobile2
  const address =  data.address
  const ordernote = data.ordernote
  const nation =  data.country
  const region =  data.region
  const province = data.city
  const postalcode = data.postalcode
  
  

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
       <Container fluid>

      <Row className="px-5">
        <Col  sm={9}>
        <h5>Customer Adress:</h5>
  
    <div>
    <Row className="mb-3">
    
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Firstname</Form.Label>
      <Form.Control onChange={handleChange} type="text" name="firstname" placeholder={destination?.firstname}    />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Lastname</Form.Label>
      <Form.Control  onChange={handleChange} type="text" name="lastname" placeholder={destination?.lastname} />
    </Form.Group>
  </Row>
  <Row className="mb-3">
  <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
    <Form.Label>Mobile</Form.Label>
    <Form.Control  onChange={handleChange} name="mobile" placeholder={destination?.mobile} />
  </Form.Group>

  <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
    <Form.Label>Additional Mobile</Form.Label>
    <Form.Control  onChange={handleChange} name="mobile2" placeholder={destination?.mobile2} />
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
    <Form.Control onChange={handleChange}  type="text" name="postalcode" className="shadow-none" placeholder={destination?.postalcode} />
  </Form.Group>
  <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
    <Form.Label>Address </Form.Label>
    <Form.Control onChange={handleChange}  name="address" placeholder={destination?.address} />
  </Form.Group>
  </Row>

<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Additional Information</Form.Label>
    <Form.Control onChange={handleChange}  name="ordernote" as="textarea" className="shadow-none" placeholder={destination?.ordernote} rows={4} />
  </Form.Group>


  <div className="d-flex">
    <div className="ms-auto p-2" >
  <Button onClick={() => dispatch(fetchUpdateAddress(biodata={firstname,
        lastname, mobile, mobile2, address,ordernote,nation,province,region, postalcode}))} variant="dark"    type="submit">
  {isLoading ? 'Loading…' : 'Save'}
  </Button>
  </div>
  </div> 
  </div>
    
  
     
    
       
        </Col>
        <Col sm={3} className="">
        <div className="d-flex flex-column mb-3 border border-info p-3">
          <p>Order Summary</p>


  <div className="p-2">
  <div className="d-flex mb-3">
  <div className="p-2 fw-bold">Item total({cartItems?.length}):
  </div>
  <div className="ms-auto p-2 fw-bold">${cartBills}</div>
</div>
  </div>
  
  
  
  {cartItems?.length > 0 && (
    <div className="d-grid gap-2 p-2">
    <div className="d-flex mb-3">
  <div className="p-2 fw-bold">Delivery Fees:
  </div>
  <div className="ms-auto p-2 fw-bold">${shipping}</div></div>
    </div>
  
    
  ) }
  </div>
  <div className="p-2">
  
  </div>

  <div className="d-flex mb-3">
  <div className="p-2"> Total:</div>
  <div className="ms-auto text-success p-2 fw-medium">${cartBills + shipping}</div>
  </div>
  <div className="p-2">Taxes and shipping calculated at checkout</div>
  <div className="p-2">
  <Form.Check aria-label="option 1" label="I agree with Terms & Conditions" /> 
  </div>
  <div className="d-grid gap-2 p-2">
      <Button variant="dark" className="shadow-none rounded-1" size="lg"  type="submit" >
      <Link to="/cart" className="text-decoration-none text-light">
       Confirm Order
       </Link>
      </Button>
      
    </div>
  

        <div className="d-flex mb-3">
        
 
  
</div>
<div className="p-2">

    </div>
  
        </Col>
      </Row>
     
    </Container> 
  
    
    </section>
      
 
  )
}

export default AddressForm