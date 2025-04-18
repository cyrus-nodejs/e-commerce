import request from 'supertest'
import app from '../src'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import {User} from '../models/User'
import { Item } from '../models/Item'
import {describe, expect, test, it, beforeAll, afterAll} from '@jest/globals';
import { createSecretToken } from '../middlewares/jwt/createSecretToken'


let token;
let user;
let product;

const test_db_url :any =process.env.TEST_DB_URI

beforeAll(async () => {
  await mongoose.connect(test_db_url);

  user = new User({ email: "test@gmail.com", password: "test123", firstname:"firsttest", lastname:'secondtest'});
  await user.save();

  product = new Item({ title: 'Item1',
    price: 10,
    description:'Item description',
    category: 'goat',
    unit:1,
    image: 'test.jpg',
    trending: false,
    recommended: false,
    topfeatured: false,
    topdeals: false,});
  await product.save();

  
  token = createSecretToken(user)
});

afterAll(async () => {
  await User.deleteMany({});
  await Item.deleteMany({});
  await mongoose.disconnect();
});


describe('GET /getcart', () => {
    it('should return owner cart', async () => {
      const response = await request(app).get('/getcart').set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);

    });
  });



  describe('POST /addtocart', () => {
    it('should create a new product', async () => {
     const  newitem ={
        title: 'Item1',
        price: 10,
        description:'Item description',
        category: 'goat',
        unit:1,
        image: 'test.jpg',
        trending: true,
        recommended: false,
        topfeatured: false,
        topdeals: false,
     
        }
    const item = await Item.create(newitem);
    const user =  User.create({ email: 'goat@gmail.com', password:"labasd", firstname: 'laver', lastname:'pork' });
      const newCart = {
        itemId: item._id,
      };
    
      const response = await request(app).post('/addtocart').set("Authorization", `Bearer ${token}`).send(newCart);
      expect(response.status).toBe(200);
      
    });
  });
