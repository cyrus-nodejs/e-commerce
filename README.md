# 🛍️ MERN eCommerce Store

A full-featured eCommerce web application built using the **MERN stack** (MongoDB, Express, React, Node.js) with product reviews, Stripe payment integration, and a full admin dashboard.

🔗 **Live Demo:** [shoppingluxury.netlify.app](https://shoppingluxury.netlify.app/)

---

## 📦 Features

### 🧑‍💻 User Features

- 🔐 User registration and login (Passport & JWT-based auth)
- 🛍️ Browse, search, and filter products
- 🛒 Add/remove items from cart
- 💳 Stripe-powered checkout & payment
- 📜 View order history and details
- ⭐ Leave and view product reviews (1–5 stars + comments)

### 🛠️ Admin Features

- 👤 Manage users (view, delete)
- 🛒 Manage products (create, edit, delete)
- 📦 View and manage orders
- ⚙️ Admin dashboard with protected routes

---

## 🧰 Tech Stack

| Layer        | Technology                        |
|-------------|------------------------------------|
| **Frontend**| React, Redux Toolkit, Bootstrap    |
| **Backend** | Node.js, Express.js                |
| **Database**| MongoDB (Mongoose)                 |
| **Auth**    | JWT, Passport                      |
| **Payments**| Stripe API                         |
| **Uploads** | Cloudinary                         |
| **Hosting** | Netlify (frontend) + Render (backend) |

---

## 🗂️ Folder Structure

📁 /client                 # React frontend
└── 📁 /src
    ├── 📁 /components     # Reusable UI components
    ├── 📁 /pages          # React pages/routes
    └── 📁 /redux          # Redux Toolkit logic (slices, store)

📁 /server                 # Express backend
├── 📁 /controllers        # Request logic handlers
├── 📁 /routes             # API route definitions
├── 📁 /models             # Mongoose models
├── 📁 /middlewares        # Auth, error handlers, etc.
└── 📄 server.js           # Entry point for backend server

 
---

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js
- MongoDB Atlas or local MongoDB
- Stripe Account (for test keys)

### 🔧 Installation

```bash
# Clone the repo
git clone https://github.com/cyrus-nodejs/mern-ecommerce.git
cd mern-ecommerce

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

```

```bash
- 🔐 Authentication & Session
TOKEN_KEY=your_token_key
JWT_SECRET=your_jwt_secret
SESSION_KEY=your_session_key
SESSION_SECRET=your_session_secret
SESSION_NAME=your_session_name

# 📧 Email Configuration
EMAIL=your_email
PASS=your_email_password

- 💳 Stripe Payment Integration
STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
STRIPE_SECRET=your_stripe_secret

# 🌍 Environment & Server
NODE_ENV=production
PORT=3000
SERVER_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173

- ☁️ Cloudinary (File Uploads)
CLOUD_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret

- 🔐 Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CALLBACK_URL=http://localhost:3000/auth/google/callback

```

```bash
Running the App
bash
Copy
Edit
# Start backend
cd server
npm run dev

# Start frontend
cd client
npm run dev

npm start
Frontend: http://localhost:5173 (React Vite)

Backend: http://localhost:3000

```

# 🛡️ Security Notes

- Passwords are hashed using passport-local-mongoose

- Routes are protected via JWT middleware

- Admin routes are role-guarded for access control


# ✨ Future Improvements

- 📑 Pagination for product listings

- 📧 Email notifications (orders, signups)

- 🌙 Dark mode toggle

📄 License
This project is licensed under the MIT License.

💬 Connect With Me
- [LinkedIn](https://www.linkedin.com/in/emmanuel-adeyemi-464ba5227)




