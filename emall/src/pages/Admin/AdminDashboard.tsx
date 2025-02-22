import {Col, Nav,Row, Tab, Container } from 'react-bootstrap'
import { useEffect } from 'react';

// import Home from '../Home/Home';
import Navbar from '../../components/Navbar/Navbar'
import AllProducts from './AllProducts';
import AllCustomers from './AllCustomers';
import AllResellers from './AllResellers';
import AllOrders from './AllOrders';
import AllCustomerService from './AllCustomerServices';
import AllAdmins from './AllAdmins';
import AssignAdmin from '../Auth/Admin/AddAdmin';
import AssignReseller from '../Auth/Admin/AddReseller';
import AssignCustomerService from '../Auth/Admin/AddCustomerService';
import AdminAdditem from './AdminAddProduct';
import { fetchAsyncUser, getAuthUser, getIsAuthenticated } from '../../redux/features/auth/authSlice';
import { getAllItems } from '../../redux/features/items/itemSlice';
import { getAdminAllAdmins, getAdminAllOrders,  getAdminAllCustomers,
    getAdminAllCustomerService, getAdminAllResellers } from '../../redux/features/admin/adminSlice';
import { useAppSelector, useAppDispatch } from '../../redux/app/hook';


function AdminDashboard () {
    
    const dispatch = useAppDispatch()
    const allproducts = useAppSelector(getAllItems)
    const allcustomers = useAppSelector(getAdminAllCustomers)
    const allcustomerservice = useAppSelector(getAdminAllCustomerService)
    const allorders = useAppSelector(getAdminAllOrders)
    const alladmins = useAppSelector(getAdminAllAdmins)
    const allresellers = useAppSelector(getAdminAllResellers)
const allAdmins = useAppSelector(getAdminAllAdmins)
 const isAuthenticated = useAppSelector(getIsAuthenticated)
const authUser =  useAppSelector(getAuthUser)
 console.log(allAdmins)
// const permission = "Require Admin"
useEffect(() =>{
    dispatch(fetchAsyncUser())
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [dispatch])
  
  return (
    <section>
      <Navbar />
       <Container fluid>
       {isAuthenticated && authUser?.role === 'admin' || isAuthenticated && authUser?.role === 'customer service'  ? (
        <Row className="px-5">
            <p className='text-center fs-4 fw-bold '>ADMIN DASHBOARD</p>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">All Products ({allproducts.length}) </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">All Customers ({allcustomers.length})</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">All Resellers ({allresellers.length})</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth">All Orders ({allorders.length})</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fifth">All Customer Service ({allcustomerservice.length})</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="sixth">All Admins ({alladmins.length})</Nav.Link>
                </Nav.Item>
               
            
                <Nav.Item>
               <Nav.Link  eventKey="seventh">Assign  Admin role</Nav.Link>
                </Nav.Item>
            
                <Nav.Item>
                 <Nav.Link eventKey="eighth" >Assign  Reseller role</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="ninth" >Assign  Customer service role</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="tenth">Add a product </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first"><AllProducts /></Tab.Pane>
                <Tab.Pane eventKey="second"><AllCustomers /></Tab.Pane>
                <Tab.Pane eventKey="third"><AllResellers /></Tab.Pane>
                <Tab.Pane eventKey="fourth"><AllOrders /></Tab.Pane>
                <Tab.Pane eventKey="fifth"><AllCustomerService /></Tab.Pane>
                <Tab.Pane eventKey="sixth"><AllAdmins /></Tab.Pane>
                <Tab.Pane eventKey="seventh"><AssignAdmin /></Tab.Pane>
                <Tab.Pane eventKey="eighth"><AssignReseller/></Tab.Pane>
                <Tab.Pane eventKey="ninth"><AssignCustomerService /></Tab.Pane>
                <Tab.Pane eventKey="tenth"><AdminAdditem /></Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        </Row>
       ) : (<div className="fs-1 text-center text danger m-5">You do not have the required Permission!</div>) }
    
        
      
    </Container>
    </section>
  );
}

export default AdminDashboard;