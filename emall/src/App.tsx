
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";

import AdminRoute from "./pages/ProtectedRoutes/AdminRoutes";
import PrivateRoute from "./pages/ProtectedRoutes/PrivateRoutes";
// import Footer from "./components/Footer";
// import Home from "./pages/Home/Home";
import Index from "./pages/Home/Index";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ErrorPage from "./pages/Errorpage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Cart from './pages/Cart/Cart';
import UpdateItem from "./pages/UpdateItem";
// import Wishlist from "./components/Wishlist/Wishlist";
import Additem from "./pages/AddItem/AddItem";
 import AddressForm from "./pages/AdressForm";
import Payment from "./pages/Checkout/Payment";
import Completion from "./pages/Checkout/Completion";
import OrderInvoice from "./pages/Order/OrderInvoice";
import Productdetails from "./pages/Productdetails";

import Category from "./pages/Category";
import Order from "./pages/Order/Order";
import OrderDetails from "./pages/Order/orderDetails";
import RetrievePayment from "./pages/Checkout/RetrievePayment"
// import UpdatePassword from "./pages/Auth/UpdatePassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";

const  App = () => {
    

  const router = createBrowserRouter([
    {
    path: "/",
    element: <Index  />,
    errorElement: <ErrorPage />
  },
  {
    path: "/admin/dashboard",
    element:  (
      <AdminRoute>
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
      <AdminRoute>
        <UpdateItem />
      </AdminRoute>
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
    path: `/orderinvoice`,
    element: (
      <PrivateRoute>
        <OrderInvoice />
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
