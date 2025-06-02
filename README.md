🛍️ MERN eCommerce Store
A full-featured eCommerce web application built using the MERN stack (MongoDB, Express, React, Node.js) with product reviews, Stripe payment integration, and a full admin dashboard.

🔗 Live Website: https://shoppingluxury.netlify.app/
📂 GitHub Repository: https://github.com/cyrus-nodejs/e-commerce

📦 Features
🧑‍💻 User Features
🔐 User registration and login (Passport & JWT-based auth)

🛍️ Browse, search, and filter products

🛒 Add/remove items from cart

💳 Stripe-powered checkout & payment

📜 Order history and details

⭐ Leave and view product reviews (1–5 stars + comments)



🛠️ Admin Features
👤 Manage users (view, delete)

🛒 Manage products (create, edit, delete)

📦 View and manage orders

⚙️ Dashboard with protected routes

🧰 Tech Stack
Layer	Tech
Frontend	React, Redux Toolkit, Bootstrap
Backend	Node.js, Express.js
Database	MongoDB (Mongoose)
Authentication	JWT, Passport
Payments	Stripe API
File Uploads	Cloudinary 
Hosting	Netlify (frontend) + Render(backend)

🗂️ Folder Structure
bash
Copy
Edit
/client       // React frontend
  /src
    /components
    /pages
    /redux
/server       // Express backend
  /controllers
  /routes
  /models
  /middlewares
  server.js
🚀 Getting Started
📋 Prerequisites
Node.js

MongoDB Atlas or local MongoDB

Stripe Account (for test keys)

🔧 Installation
bash
Copy
Edit
# Clone the repo
git clone https://github.com//cyrus-nodejs/mern-ecommerce.git
cd mern-ecommerce

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
🧪 Environment Variables
Create a .env file in the /server folder:

ini
Copy
Edit
TOKEN_KEY= TOKEN_KEY
JWT_SECRET=JWT_SECRET
EMAIL=EMAIL
NODE_ENV=production
PASS=PASS
STRIPE_PUBLISHABLE_KEY=STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET=STRIPE_SECRET
SESSION_KEY= SESSION_KEY
SESSION_SECRET=SESSION_SECRET
SESSION_NAME=SESSION_NAME
NODE_ENV = NODE_ENV 
PORT = PORT
CLOUD_NAME = CLOUD_NAME
CLOUDINARY_KEY= CLOUDINARY_KEY
CLOUDINARY_SECRET = CLOUDINARY_SECRET
SERVER_URL=SERVER_URL
FRONTEND_URL=SERVER_URL
FRONTEND_URL2=FRONTEND_URL2
GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=GOOGLE_CLIENT
CALLBACK_URL =CALLBACK_URL 
🚦 Run the App
bash
Copy
Edit
# Run backend
cd server
npm run dev

# Run frontend
cd ../client
npm start
Frontend: http://localhost:5173
Backend: http://localhost:3000

🛡️ Security Notes
Passwords are hashed using passport mongoose local

Routes are protected with JWT middleware

Admin routes are role-guarded

✨ Future Improvements

Pagination for product listings

Email notifications (orders, signups)

Dark mode toggle



🙌 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

📄 License
This project is open-source and available under the MIT License.

💬 Connect With Me
LinkedIn: Your Profile


