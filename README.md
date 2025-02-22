# MERN E-Commerce Application

A fully functional e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js). This app includes features like product browsing, shopping cart management, Stripe payment integration, and an admin dashboard to manage products and orders.

## Features

- **Product Browsing**: Users can view a variety of products with images, descriptions, and prices.
- **Shopping Cart**: Users can add items to the cart, view the cart, update quantities, and proceed to checkout.
- **Stripe Payment Integration**: Users can securely make payments using Stripe's API.
- **Admin Panel**: Admin users can manage products (add, update, delete) and view order details.
- **User Authentication**: Secure user login and registration using JWT (JSON Web Tokens).
- **Order Management**: Admins can see and manage customer orders and their statuses.

## Technologies Used

- **Frontend**: React, Redux (for state management), Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Stripe API
- **Hosting**: (Choose your preferred hosting solution, e.g., Heroku, Netlify for frontend, etc.)

## Getting Started

To run this project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/cyrus-nodejs/e-commerce.git
2. Install Dependencies
Install both client-side and server-side dependencies.

For the backend:
bash
Copy
cd backend
npm install
For the frontend:
bash
Copy
cd frontend
npm install
3. Set Up Environment Variables
Create a .env file in the root of both backend and frontend directories.

Backend .env file:
bash
Copy
MONGO_URL=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
STRIPE_SECRET=<your-stripe-secret-key>
MONGO_URL=mongodb+srv://admin-bakerr:N0qmGOCBDkSPKQYC@cluster0.pdu7dww.mongodb.net/shop-here


#  FRONTEND_URL= http://localhost:5173
PASS=ovcqtpyyevpbtjms
STRIPE_PUBLISHABLE_KEY = pk_test_51Mm5W2C39kEUAF74gA8phE7elm1XbnhXDVOckq9LkH5s5Vqk2R7veSHQC9EVq6N48uGuIwiReOcjgoOZVNQXzAPi00z6RuwWbw
STRIPE_SECRET = sk_test_51Mm5W2C39kEUAF7481E7iFl931qdc47cg1Wr2VHq7fyP8dJAa96Q5sdda6pk5xlkCYjxh2HwjFEXf0eSByhrP4sv00N1jK2w1O

Frontend .env file:
bash
Copy
REACT_APP_BACKEND_URL=http://localhost:5000
4. Run the Application
Start the Backend Server:
bash
Copy
cd backend
npm start
Start the Frontend Development Server:
bash
Copy
cd frontend
npm start
Your application should now be running at http://localhost:3000.

Admin Panel
The admin dashboard allows managing products and viewing orders. You can access it by logging in with the admin credentials (ensure the user is marked as an admin in the database).

Stripe Integration
Sign up for a Stripe account here.
Obtain your Stripe API keys and place them in the backend .env file.
Make sure to test payments using Stripe's test card numbers.
Screenshots

Future Improvements
Add pagination for products.
Integrate more payment gateways.
Implement email notifications for order updates.
Add reviews and ratings for products.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
Thanks to Stripe for providing the payment gateway API.
Thanks to MongoDB for database management.
Feel free to fork, contribute, or modify this repository as needed!

markdown
Copy

### Key Points:
1. **Folder Structure**: 
    - `backend`: Contains the Node.js API.
    - `frontend`: Contains the React app.
2. **Admin Panel**: Add functionality to manage products and orders, and ensure proper authentication for admin users.
3. **Stripe Integration**: You’ll need the Stripe API keys, and the backend should handle payment processing.
4. **Environment Variables**: These should be securely stored and not exposed publicly.

Let me know if you need any specific additions or modifications!