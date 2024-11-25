
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";


import Home from "./pages/Home/Home";
import ErrorPage from "./pages/Errorpage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Cart from "./pages/Cart";
// import Wishlist from "./components/Wishlist/Wishlist";
import Additem from "./pages/AddItem";
 import AddressForm from "./pages/AdressForm";
import Payment from "./pages/Checkout/Payment";
import Completion from "./pages/Checkout/Completion";
import OrderInvoice from "./pages/OrderInvoice";
import Productdetails from "./pages/Productdetails";

import Category from "./pages/Category";
import Order from "./pages/Order";
import OrderDetails from "./pages/orderDetails";
import RetrievePayment from "./pages/RetrievePayment";
// import UpdatePassword from "./pages/Auth/UpdatePassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";

const  App = () => {
    

  const router = createBrowserRouter([
    {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: `/register`,
    element: <Register   />,
    errorElement: <ErrorPage />
  },

  {
    path: `/login`,
    element: <Login   />,
    errorElement: <ErrorPage />
  },



  // {
  //   path: `/wishlist`,
  //   element: <Wishlist  />,
  //   errorElement: <ErrorPage />
  // },
  {     
    path: `/additem`,
    element:<Additem /> ,
    errorElement: <ErrorPage />
  },
  {
    path: "/category/:id",
    element: <Category   />,
   errorElement: <ErrorPage />
  },

  {     
    path: `/payment`,
    element:<Payment   /> ,
    errorElement: <ErrorPage />
  },
  {     
    path: `/completion`,
    element:<Completion    /> ,
    errorElement: <ErrorPage />
  },


  {
    path: `/cart`,
    element: <Cart  />,
    errorElement: <ErrorPage />
  },
  {     
    path: `/orderdetails/:id`,
    element:<OrderDetails  /> ,
    errorElement: <ErrorPage />
  },
  {     
    path: `/orderinvoice`,
    element:<OrderInvoice  /> ,
    errorElement: <ErrorPage />
  },
  {     
    path: `/orders`,
    element:<Order  /> ,
    errorElement: <ErrorPage />
  },
  {     
    path: `/editaddress`,
    element:<AddressForm   /> ,
    errorElement: <ErrorPage />
  },
  {
    path: "/product/:id",
    element: <Productdetails     />,
   errorElement: <ErrorPage />
  },
 
  {
    path: "/retrievepayment",
    element: < RetrievePayment  />,
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
  // {
  //   path: "/updatepassword",
  //   element: < UpdatePassword  />,
  //  errorElement: <ErrorPage />
  // },
  
  
  




  
])


  return (
    <section  >
    <RouterProvider router={router}  />
    </section>
  )
}

export default App
