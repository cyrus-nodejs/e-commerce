import request from 'supertest'
import app from '../src/index'
import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server'
import express from "express"
import {getAuthUser} from '../controllers/Auth'
import {User} from '../models/User'
import {Cart} from '../models/Cart'
import { Item } from '../models/Item'
import {describe, expect, test, it, beforeAll, afterEach, beforeEach, afterAll} from '@jest/globals';

import {createSecretToken} from '../middlewares/jwt/createSecretToken'
let mongoServer;
let token;
let user;
const JWT_SECRET = process.env.JWT_SECRET || 'testsecret';
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
}, 30000);

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();

 
}, 30000);

beforeEach(async () => {
 
   
  await Cart.deleteMany();
  await Item.deleteMany();

}, 30000);

describe('Cart API', () => {
  const user =  {id:"478rrrhuii5r8rbjrudb", name: 'Test User', email: 'test@example.com', password: 'hashedpw' }
  // create JWT
token = createSecretToken(user)


  
  it('should create and retrieve a cart', async () => {
    const productData = await Item.create(
      {  
        title: 'Item1',
      price: 10,
      description:'Item description',
      category: 'goat',
      unit:1,
      image: 'test.jpg',
      trending: false,
      recommended: false,
      topfeatured: false,
      topdeals: false,
    });
    
    const res = await request(app).post('/addtocart').set('Authorization', `Bearer ${token}`).send({itemId:productData._id});
     expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Item added to Cart!');
    expect(res.body.itemId).toBe(productData._id);



    const getRes = await request(app).get(`/getcart`).set('Authorization', `Bearer ${token}`)
    
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('View cart!');
 

    // expect(getRes.body.bill).toBe(productData.title);
  });

  it('should delete from  cart for a user', async () => {
    const productData = await Item.create({
        title: 'Item1',
      price: 10,
      description:'Item description',
      category: 'goat',
      unit:1,
      image: 'test.jpg',
      trending: false,
      recommended: false,
      topfeatured: false,
      topdeals: false, });
    // const owner = new mongoose.Types.ObjectId();

    // await request(app).post('/deletecart').send({productData});

    const deleteRes = await request(app).post(`/deletecart`).set('Authorization', `Bearer ${token}`).send({itemId:productData?.id});
    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.message).toBe('Item deleted from Cart');
    

     
  });
});