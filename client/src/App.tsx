import { useEffect } from "react";
import { useAppDispatch } from "./redux/app/hook";
import  {fetchAsyncUser} from './redux/features/auth/authSlice'
import { fetchCart } from "./redux/features/cart/cartSlice";
import { fetchAllOrders } from "./redux/features/order/orderSlice";
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";


import PrivateRoute from "./pages/ProtectedRoutes/PrivateRoutes";
import AdminRoute from "./pages/ProtectedRoutes/AdminRoutes";
import Unauthorized from './pages/ProtectedRoutes/UnAuthorised'

import AdminDashboard from "./pages/Admin/AdminDashboard";


import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ResetPassword from "./pages/Auth/ResetPassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";



import Additem from "./pages/AddItem/AddItem";
import UpdateItem from "./pages/UpdateItem";
import Productdetails from "./pages/Review/Productdetails";

import Category from "./pages/Home/Category/CategoryItems";

import AddressForm from "./pages/AdressForm";


import Cart from './pages/Cart/Cart';

import Order from "./pages/Order/Order";
import OrderDetails from "./pages/Order/orderDetails";

import Payment from "./pages/Checkout/Payment";
import Completion from "./pages/Checkout/Completion";
import RetrievePayment from "./pages/Checkout/RetrievePayment"


import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import FrequentAskedQuestions from "./pages/FAQ";

import Index from "./pages/Home/Index";
import ErrorPage from "./pages/Errorpage";


const  App = () => {
   
  const dispatch = useAppDispatch()
  
  //get Authorized User
  useEffect(() =>{
     console.log("Dispatching fetchAsyncUser");
        dispatch(fetchAsyncUser())
        dispatch(fetchCart())
        dispatch(fetchAllOrders())
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [dispatch])

  
const router = createBrowserRouter([
    {
    path: "/",
    element: <Index  />,
    errorElement: <ErrorPage />
  },
  
  {
    path: "/admin/dashboard",
    element: 
      (<AdminRoute>
        <AdminDashboard />
      </AdminRoute>
     ),

    errorElement: <ErrorPage />
  },
 
  {
    path: `/register`,
    element: <Register   />,
    errorElement: <ErrorPage />
  },

    {
    path: `/unauthorized`,
    element: <Unauthorized   />,
    errorElement: <ErrorPage />
  },
  {
    path: `/login`,
    element: <Login   />,
    errorElement: <ErrorPage />
  },




  {     
    path: `/additem`,
    element: (
      <PrivateRoute>
        <Additem />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/category/:id",
    element: <Category   />,
   errorElement: <ErrorPage />
  },


  {     
    path: `/payment`,
    element: (
      <PrivateRoute>
        <Payment/>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },
  {     
    path: `/completion`,
    
    element: (
      <PrivateRoute>
        <Completion/>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },


  {
    path: `/cart`,
    element:  (
      <PrivateRoute>
        <Cart />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },
  {     
    path: `/update/item/:id`,
    element: (
      <PrivateRoute>
        <UpdateItem />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },
  {     
    path: `/orderdetails/:id`,
    element: (
      <PrivateRoute>
        <OrderDetails />
      </PrivateRoute>
    ), 
    errorElement: <ErrorPage />
  },

  {     
    path: `/orders`,
    element: (
      <PrivateRoute>
        <Order />
      </PrivateRoute>
    ),
      
    errorElement: <ErrorPage />
  },
  {     
    path: `/editaddress`,
    element:  (
      <PrivateRoute>
        <AddressForm />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/product/:id",
    element: <Productdetails     />,
   errorElement: <ErrorPage />
  },
 
  {
    path: "/retrievepayment",
    element:  (
      <PrivateRoute>
        <RetrievePayment />
      </PrivateRoute>
    ),
   errorElement: <ErrorPage />
  },

  {
    path: "/forgotpassword",
    element: < ForgotPassword  />,
   errorElement: <ErrorPage />
  },
  {
    path: `/resetpassword/:id`,
    element: < ResetPassword  />,
   errorElement: <ErrorPage />
  },

    {
    path: `/about-us`,
    element: < AboutUs  />,
   errorElement: <ErrorPage />
  },

    {
    path: `/contact-us`,
    element: < ContactUs  />,
   errorElement: <ErrorPage />
  },

    {
    path: `/faq`,
    element: < FrequentAskedQuestions  />,
   errorElement: <ErrorPage />
  },

  
  
  




  
])


  return (
    <section  >
    <RouterProvider router={router}  />

    </section>
  )
}

export default App
