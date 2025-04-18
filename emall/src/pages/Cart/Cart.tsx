/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {Container, Row, Col,  Button, Form, Image , Table} from "react-bootstrap"
import { ITEM } from "../../utils/@types"
import "../../index.css"

import Navbar from "../../components/Navbar/Navbar"
 import { Link } from "react-router-dom"

import { useGetCountry } from 'react-country-list';
import {
  SyntheticEvent,

} from 'react';

import { useAppSelector, useAppDispatch } from "../../redux/app/hook"
import { getAddress, getMessage, fetchAddress, fetchCreateAddress } from "../../redux/features/address/addressSlice"
import {  useEffect, useState, useContext  } from "react";
import { FavoriteContext } from "../../../src/Context/wishlist"

import {  fetchDeleteFromCart, getCartItems, fetchClearCart, 
  fetchReduceCartQTY, fetchAddCartQty, getCartBills,   } from "../../redux/features/cart/cartSlice"
import { addGiftWrap } from "../../redux/features/order/orderSlice"
  // import { getClientSecret,   } from "../redux/features/checkout/checkoutSlice"
  import { getShipping, getGift } from "../../redux/features/order/orderSlice"
  import { fetchCreatePayment } from "../../redux/features/checkout/checkoutSlice"
  import { getAuthUser} from "../../redux/features/auth/authSlice"
const Cart = () => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let orderdata;
const dispatch = useAppDispatch()
const destination = useAppSelector(getAddress)
const cartBills = useAppSelector(getCartBills)
const cartItems = useAppSelector(getCartItems)
const gift = useAppSelector(getGift)
// const clientSecret = useAppSelector(getClientSecret)
const shipping = useAppSelector(getShipping)
const updateUser = useAppSelector(getAuthUser)
const {state} = useContext(FavoriteContext)

const message  = useAppSelector(getMessage)
  
  
 const date = new Date()
 date.setDate(date.getDate() + 7)
 
 const pickupDate = new Date()
 pickupDate.setDate(pickupDate.getDate() + 17)

 console.log(date.toDateString())
  
    const [country, setCountry] = useState<string>('');
    const [State, setState] = useState<string>('');
    const [city, setCity] = useState<string>();
    const [isLoading, setLoading] = useState(false);
    
   
    const { cityList, stateList, countryList } = useGetCountry({
      country,
      State,
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


    useEffect(() => {
     dispatch(fetchAddress())
    }, [dispatch]);
       console.log(destination)

    
    
  
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
    
  }, []);
 
console.log(destination)

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
   console.log(destination)
  return (
   
    <section>
      <Navbar />
       <Container className='home' fluid>
        <p className="text-center fs-2">Place your Order</p>
      <Row className="px-5">
        <Col  sm={9}>
        
        <div className="d-flex mb-3">
  <div className="p-2"><h5>Customer Address</h5></div>
  <div className="ms-auto d-flex p-2"><a href="/editaddress" className="text-decoration-none  text-black"><div className="d-inline-flex"><div className="mt-1">Change Location</div><div><i className='bx bx-chevron-right pt-2  bx-sm'></i></div></div></a></div>
</div>
        {destination ? (<Row>
          {/* {destination.map((items:ADDRESSITEM) => {
            return ( */}
              <div>
              <div className="d-flex mb-3">
  <div className="p-2 col-6">
  <div className="d-flex p-2 border">Email Address</div>
  <div className="d-flex px-2 border pb-5">{updateUser?.email}</div>
  </div>

  <div className="ms-1 p-2  rounded-2 col-6">
  <div className="d-flex p-2 border  ">Address Book</div>
  <div className="d-flex p-2 border  ">
  <div className="d-flex flex-column mb-3">
  <div className="p-2">Your default shipping address:</div>
  <div className="p-2">{destination.firstname} {destination.lastname}</div>
  <div className="p-2">{destination.address}</div>
  <div className="p-2">{destination.province}, {destination.region}</div>
  <div className="p-2">{destination.mobile}</div>
</div>
  
    </div>
  </div>
</div>
              
                
                </div>   
            {/* )
        } )} */}
           
        </Row>) : (<div><Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Firstname</Form.Label>
          <Form.Control onChange={handleChange} type="text" name="firstname" placeholder="Firstname" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Lastname</Form.Label>
          <Form.Control  onChange={handleChange} type="text" name="lastname" placeholder="lastname" />
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
        <Form.Label>Mobile</Form.Label>
        <Form.Control  onChange={handleChange} name="mobile" placeholder="mobile" />
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
        <Form.Label>Additional Mobile</Form.Label>
        <Form.Control  onChange={handleChange} name="mobile2" placeholder="mobile2" />
      </Form.Group>
      </Row>
      

      <Row className="mb-3">
      <Form.Group as={Col} className="mb-3" controlId="country">
        <Form.Label>Country</Form.Label>
        <Form.Select aria-label="Default select example"
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
        <Form.Control onChange={handleChange}  type="text" name="postalcode" className="shadow-none" placeholder="Zip/Postal Code" />
      </Form.Group>
      <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address </Form.Label>
        <Form.Control onChange={handleChange}  name="address" placeholder="address" />
      </Form.Group>
      </Row>

<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>ADD ORDER NOTE</Form.Label>
        <Form.Control onChange={handleChange}  name="ordernote" as="textarea" className="shadow-none" placeholder="Additional information?" rows={4} />
      </Form.Group>


      <div className="d-flex">
      <div className="text-dark">{message}</div>
        <div className="ms-auto p-2" >
      <Button onClick={() => dispatch(fetchCreateAddress(orderdata={firstname,
        lastname, mobile, mobile2, address,ordernote,nation,province,region, postalcode}))} variant="dark"    type="submit">
      {isLoading ? 'Loading…' : 'Save'}
      </Button>
      </div>
      </div> </div>)}
      
     
    
        <Table  className="table table-hover" responsive   >
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {cartItems?.map((item:ITEM ) => {
        return (
      
        <tr>
          <td>

          <div className="d-inline-flex">
  <div className="p-2 flex-fill"> <Image src={item.image} width="50px" alt={item.title} className="rounded-md h-24" /></div>
  <div className="p-2 flex-fill">
  <div className="d-flex flex-column mb-3">
  <div className="p-2"><p className="text-primary fw-medium">{item.title}</p></div>
  <div className="p-2"><p className="text-gray-600">{state.currency}{item.price}</p></div>
   </div>  </div>   </div>
          </td>
          <td>
          <div className="d-flex">
  <div className="p-2 flex-fill"><Button
              className="border "
              variant="light"
             
              onClick={() => dispatch(fetchAddCartQty(item))}
            >
              +
            </Button></div>
  <div className="p-2 flex-fill"> <Button variant="light" className='border'>{item.quantity}</Button></div>
  <div className="p-2 flex-fill"><Button
  variant="light"
              className="border"
              onClick={() => dispatch(fetchReduceCartQTY(item))}
            >
              -
            </Button></div>
</div>
          </td>
          <td><div className="p-2"><p className="text-gray-600">${item.price}</p></div></td>
          <td><div className="p-2 flex-fill"  onClick={() => dispatch(fetchDeleteFromCart(item))}><i className='bx bx-trash'></i></div>

          </td>
        </tr>
      )
    })}
  
      </tbody>
    </Table>
    <div className="d-flex mb-3">
  <div className="p-2 me-auto">
  <Button  variant="dark" size="sm" className="rounded-1 px-5 py-2">
  <a href="/" className="text-light text-decoration-none"> CONTINUE SHOPPING</a>
      </Button>
  </div>
  
  <div className="me-auto p-2">
  <Button variant="dark" size="sm" className="rounded-1 px-5 py-2" onClick={() => dispatch(fetchClearCart())}>
      DELETE ALL
      </Button>
  </div>
  <div className=" p-2 ms" >

      <Button onClick={() => dispatch(addGiftWrap())} variant="dark"    type="submit">
      {isLoading ? 'Loading…' : 'ADD GIFT WRAP'}
      </Button>
      <div><i className='bx bx-gift'></i> Do you want a gift wrap?
      Only {state.currency}3.00</div>
      </div>
      
</div>


  
      

        </Col>
        <Col sm={3} className="">
        <p className="text-start text-dark text-underline">Order Summary</p>
        <div className="d-flex flex-column mb-3 border  p-3">
         
  
  {cartItems?.length > 0 && (
    <div className="d-grid gap-2 p-2">
      <div className="d-flex "> 
      <div className="d-flex flex-column ">
  <div className="">
  
  <div className="d-flex">
  <div className="flex-shrink-0">
  <i className='bx bxs-truck bx-md'></i>
  </div>
  <div className="flex-grow-1 ms-3">
  
Arriving at {destination?.address} {destination?.province} between {date.toDateString()}  & {pickupDate.toDateString() }  when you order within next 4hrs 41mins
  </div>
  </div>
  <div className="p-2">
  <div className="d-flex">
  <div className="flex-shrink-0">
    <i className='bx bxs-offer bx-md'></i>
  </div>
  <div className="flex-grow-1 ms-3">
  Free return within 7 days for ALL eligible itemsDetails
  </div>
  </div>
  
</div>
      </div>
   
   
    </div>
  
    </div>
    </div>
  ) }
  </div>
  <div className="p-2">
  <div className="d-flex ">
  <div className="p-2 fw-bold">Delivery Fees:</div>
  <div className="ms-auto p-2 fw-bold">{state.currency}{shipping}</div>
  </div>
  </div>
  <div className="p-2">
  <div className="d-flex ">
  <div className="p-2 fw-bold">Item total({cartItems?.length}):</div>
  <div className="ms-auto p-2 fw-bold">{state.currency}{cartBills}</div>
</div>
  </div>
  <div className="p-2">
  {gift ? (
    <div className="d-flex ">
  <div className="p-2 fw-bold">Gift wrap:
  </div>
  <div className="ms-auto p-2 fw-bold">{state.currency}{gift}</div>
</div>) : (null) }
  </div>
  {cartItems?.length > 0 ? (
    <div className="d-grid gap-2 p-2">
    <div className="d-flex mb-3">
  <div className="p-2 fw-bold">Total:
  </div>
  <div className="ms-auto p-2 fw-bold">{state.currency}{  gift + shipping + cartBills }</div></div>
    </div>
  
    
  ): (<div className="p-2">
    <div className="d-flex mb-3">
    <div className="p-2"> Total:</div>
    <div className="ms-auto text-success p-2 fw-medium">{state.currency}0</div>
  </div>
    </div>) }
  
  <div className="p-2">Taxes and shipping calculated at checkout</div>
  <div className="p-2">
  <Form.Check aria-label="option 1" label="I agree with Terms & Conditions" /> 
  </div>
  <div className="d-grid gap-2 p-2">

      <Button variant="dark" className="shadow-none rounded-1" size="lg" type="submit" onClick={() => dispatch(fetchCreatePayment(orderdata={gift, shipping,  cartBills}))}>
      <Link to="/payment" className="text-decoration-none text-light">
       Make Payment
       </Link>
      </Button>
   
    </div>
  

        <div className="d-flex mb-3">
        
 
  
</div>
<div className="p-2">

    </div>
  
        </Col>
      </Row>
      {
      cartItems?.length > 0 ? (
        <div className="">
          
<div className="d-grid gap-2">
      
      
     
    </div>
      
     
    </div>
      ) : (
        <h1 className="text-lg font-bold">Your cart is empty</h1>
      )
    }
    </Container> 
  
    
    </section>
      
 
  )
}

export default Cart