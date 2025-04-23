import request from 'supertest'
import app from '../src'
import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server'


import jwt from 'jsonwebtoken'
import {User} from '../models/User'
import { Item } from '../models/Item'
import {describe, expect, test, it, beforeAll, afterEach, beforeEach, afterAll} from '@jest/globals';
import { createSecretToken } from '../middlewares/jwt/createSecretToken'


let token;
let user;
let product;

// const test_db_url :any =process.env.TEST_DB_URI
let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Create a user
  user = await User.create({ email: 'test@example.com', password: 'hashedpassword' });

  // Simulate login (or signup)
  // Simulate login (or signup)
  const loginRes = await request(app)
    .post('/auth/login')
    .send({ email: 'test@example.com', password: 'hashedpassword' });

  token = loginRes.body.token; // Assuming your /auth/login returns { token: "JWT" }

  
}, 30000);

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();

  await mongoose.disconnect();
}, 3000);



afterEach(async () => {
  await Promise.all([
    User.deleteMany({}),
  Item.deleteMany({}),
  ]);
},30000);


  describe('POST /addtocart', () => {
    let user;
    let product;
   
  beforeEach(async () => {
    user = await User.create({ email: 'test@example.com', password: 'hashedpassword' });
    product = await Item.create({ title: 'Item1',
        price: 10,
        description:'Item description',
        category: 'goat',
        unit:1,
        image: 'test.jpg',
        trending: false,
        recommended: false,
        topfeatured: false,
        topdeals: false,
  })
})
  test('Add to cart and create order', async () => {
    // Add to cart
    const addToCartRes = await request(app)
      .post('/cart/addtocart').set("Authorization", `Bearer ${token}`)
      .send({
        itemId: user._id,
      });
    
    expect(addToCartRes.statusCode).toBe(200);
    expect(addToCartRes.body.cart.items.length).toBe(1);
    const cartRes = await request(app)
    .get('/getcar').set("Authorization", `Bearer ${token}`)
    .send({
      userId: user._id
    });
  
  expect(cartRes.statusCode).toBe(201);
  expect(cartRes.body.items.lengh).toBe(200); // 2 * 100
  
  const updatedProduct = await Item.findById(product._id);
  expect(updatedProduct.stock).toBe(8); // Stock reduced
  
 
  });

  
})


  // describe('GET /getcart', () => {
  //   it('should return owner cart', async () => {
  //     const response = await request(app).get('/getcart').set("Authorization", `Bearer ${token}`);
  //     expect(response.status).toBe(200);

  //   });
  // })

