MERN E-commerce Application Documentation
This documentation provides an overview of how to build and deploy a full-fledged MERN (MongoDB, Express.js, React, Node.js) e-commerce application with features such as adding items to the cart, making payments, and admin privileges.

Table of Contents
Overview
Technology Stack
Features
Frontend Implementation
Backend Implementation
Admin Panel
Authentication & Authorization
Payment Gateway Integration
Deployment
Conclusion

1. Overview
   This MERN e-commerce application allows users to browse products, add them to the cart, and proceed to payment. The application also includes an admin dashboard to manage products, users, and orders.

2. Technology Stack
   Frontend: React.js, Redux, React Router, Axios
   Backend: Node.js, Express.js
   Database: MongoDB
   Authentication: JWT (JSON Web Tokens)
   Payment Gateway: Stripe or PayPal
   Other Tools: Mongoose (ODM), Passport mongoose Local (password hashing), Cors (Cross-Origin Resource Sharing)

3. Features
   Product Listing: Users can view a list of available products, including descriptions, prices, and images.

   Cart Management: Users can add, remove, and update quantities of items in their cart.

   Checkout & Payment: Users can proceed to checkout and pay for their orders using Stripe or PayPal.

   Order Management: Users can view order history and order details.
   Admin Panel: Admins can add, edit, or delete products and manage orders and users.

   Authentication: Users can sign up, log in, and log out. Admins are authenticated with higher privileges.

   Responsive Design: The app is responsive, ensuring it works on both desktop and mobile devices.

4. Frontend Implementation
   React Components Structure

   App.js: Main entry point of the React app. Sets up routing for the application.

   ProductList: Displays all the products fetched from the backend.

   ProductDetails: Displays individual product details.

   Cart: Manages the cart items, including adding/removing items and displaying cart totals.

   Checkout: Allows users to review their cart and proceed to payment.

   AdminDashboard: Provides access to the admin features to manage products, users, and orders.

   Routing with React Router jsx

   Copy
   import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
return (
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
}...

])
);
}

Redux toolkit for State Management

Actions:
fetchCart fetch AddCart fetchAddCartQty fetchCreatePayment, fetchAddItem. fetchDeleteItem

Reducers:
authReducer, addressReducer, cartReducer, checkoutReducer, itemsReducer orderReducer

Example cartReducer:

export const cartSlice = createSlice({
name: 'cart',
initialState,

The `reducers` field lets us define reducers and generate associated actions
reducers: {

},
extraReducers: (builder) => {

// Add reducers for additional action types here, and handle loading state as needed

builder.addCase(fetchCart.pending, (state) => {
state.status = 'pending'

    })
    .addCase(fetchCart.fulfilled, (state, action) => {
         state.cartItems= action.payload.cart.items
         state.cartBills = action.payload.cart.bill

      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;

      })
      .addCase(fetchAddCart.pending, (state) => {
      state.status = 'pending'


      })
      .addCase(fetchAddCart.fulfilled, (state, action) => {
        state.message = action.payload.message
      state.status = 'succeeded'
      })
      .addCase(fetchAddCart.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })...

},
})

5.  Backend Implementation

        API Endpoints
        GET /api/items: Retrieve all products.
        GET /api/getiyem/:id: Retrieve a specific product by ID.
        POST /api/products: Add a new product (reseller only).
        PUT /api/update/item/:id: Update a product (customer service only).
        DELETE /api/delete/item/:id: Delete a product (admin-only).
        POST /api/checkout: Process payment and create an order.
        POST /api/login: User login to generate JWT.
        POST /api/register: User registration to create a new account.

        Items Model (Mongoose Schema)

        const ItemSchema = new Schema({

    title:{type:String, required:true,unique:true,},
    description:{type:String, required:true,unique:true},
    category:{type:String,required:true,},price:{type:Number, required:true,},
    newprice:{ type:Number, required:true,},
    status:{ type:String,},review:{type:Number},
    rating:{type:Number, }...
    })

export const Item:any = mongoose.model("Item", ItemSchema);

Authentication & Authorization Middleware
Passport-mongoose-local is used for session authentication
JWT is used to protect routes(Authorization).
Admin routes are protected with a VERIFYROLE middleware that checks if the user is an admin.

copy
//Verify User Role
export const verifyRole = (roles: string | any[]) => {
return (req:any, res:any, next:any) => {
if (!roles.includes(req.user?.role)) {
return res.json({success:false, message: `Access denied. ${req.user.role } access level required!` });
}
next()
}
};

//Authorize Users

export const userAuthorization = (req:Request, res:Response,next:NextFunction) => {
const eToken = req.cookies.eToken
console.log(`verifytoken => ${eToken}`)
if (!eToken){
return res.json({success:false, message:"No Access Token! "})
}
jwt.verify(eToken, process.env.TOKEN_KEY!, async (err:any, user:any) => {
if(err){
return res.json({success:false, message:`Invalid or expired token!`})
}
next()

    })

}

6.  Admin Panel

    The admin panel allows the admin user to manage the e-commerce application:
    Product Management: Add, edit, or remove products.
    Order Management: View and manage customer orders.
    User Management: View all users and their details.

    Admin Routes
    POST /api/admin/add/item: Add a new product.
    PUT /api/admin/update/item/:id: Update an existing product.
    DELETE /api/admin/delete/item/:id: Delete a product.

7.  Authentication & Authorization

        User Registration:
        Collect user information like email, password, and role.
        Hash the password using passpor-local-mongoose and save the user in the database.


        const UserSchema = new Schema({

    email:{type:String,required:true, unique:true,lowercase:true,},
    username:{type:String,unique:true,},
    firstname:{type:String,},
    lastname:{type:String,},
    role:{type:String,
    enum: [ 'customer', 'reseller','customer service', 'admin', 'super admin'],
    default:'customer'},
    token:{type:String, unique:true,
    },
    register_date:{type:Date, default: Date.now},

})

UserSchema.plugin(passportLocalMongoose);
export const User:any = mongoose.model("User", UserSchema);

User Login:

try {
if (!req.body.username) {
res.json({ success: false, message: "Username was not given" })
} else {
if (!req.body.password) {
res.json({ success: false, message: "Password was not given" })
} else {
passport.authenticate('local', async (err: any, user: any, info: any) => {
if (err) {
res.json({ success: false, message: err })
} else {
if (!user) {
res.json({ success: false, message: 'username or password incorrect' })
} else {
req.login(user, async (err: any) => {
if (err) {
res.json({ success: false, message: err })
} else {
console.log(`Login my ${req.user}`)
const eToken = createSecretToken(user);
res.cookie("eToken", eToken, {
withCredentials: true,
httpOnly:false,
});
res.json({ success: true, message: "Authentication successful", user:user });
}
})
}
}
})(req, res);
}
}

} catch (error) {
console.log(error)

}

8.  Payment Gateway Integration
    We will integrate Stripe to handle payments.
    Install Stripe package:

Copy
npm install stripe
Backend Route for Stripe Payment:

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
app.post('/api/create-payment-intent', async (req, res) => {
const owner = req.user?.id
const {gift, shipping, cartBills} = req.body
try{
const bill = gift + shipping + cartBills
console.log(bill)
if (owner){
let paymentIntent = await stripe.paymentIntents.create({
amount: bill \* 100,
currency: "usd",
});
if (!paymentIntent) throw Error('payment failed!');
if (paymentIntent){
const OrderExists = await Order.findOne({paymentid:paymentIntent.id})
let cart = await Cart.findOne({owner})
if (OrderExists){
res.json({success:true, message:"Order Exists"})
}else{
const order = await Order.create({
owner,
items: cart.items,
bill: bill,
giftwrapper:gift,
deliveryfee:shipping,
paymentid:paymentIntent.id
});
console.log(paymentIntent.client_secret)
res.json({success:true, message:"Payment intent created!", clientSecret: paymentIntent.client_secret})
}  
 }else{
res.json({sucess:false, message:"cannot create payment intent!!"})
}
}else{
res.json({sucess:false, message:"Cannot find user!"})
}
}catch (err){
console.log(err)
res.json({success:false, message:"Something went wrong"})
}
});

9.  Deployment
    To deploy your MERN e-commerce app:

Frontend Deployment:
You can deploy the frontend using platforms like Netlify or Vercel.

Backend Deployment:
Deploy the backend on platforms like Render, Digital DigitalOcean, or AWS.

Use MongoDB Atlas for hosting the MongoDB database.

10. Conclusion
    This MERN-based e-commerce application provides a solid foundation for building an online store with essential features like cart management, payment processing, and admin privileges. By following this documentation, you can easily expand and customize the application to fit your business needs.

Feel free to ask if you need further clarification or additional features!

PREREQUISITES
Node.js ( version v21.1.0 or later )
MongoDB installed and running locally
Clone the project
git clone https://github.com/cyrus-nodejs/e-commerce

Backend: http://localhost:3000
Frontend: http://localhost:5173
Bonus

<!-- s -->

Test Login credentials

ADMIN LOGIN TEST DETAILS
admin level
login: Admin@gmail.com
password: Admin123

customer service admin level
login customerservice@gmail.com
password: customerservice123

NON ADMIN LOGIN TEST DETAILS
Login : customer@gmail.com
password: Customer123

Don't forget to star the repository and share your feedback!✨

Author
@King_Cyrus
