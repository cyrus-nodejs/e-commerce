
import request from 'supertest'
import app from '../src/server'
import { beforeAll, afterAll, test,it, expect } from '@jest/globals';
import { Item } from '../models/Item';
import {Cart} from '../models/Cart'
import { createSecretToken } from '../middlewares/jwt/createSecretToken'
import mongoose from 'mongoose'



it('should add item to cart after login', async () => {


  const userId = new mongoose.Types.ObjectId().toHexString()
    const user = { firstname:'men',
      _id:userId,
      lastname:"here",
      username: 'test@example.com',
        email: 'test@example.com',
        password: 'password123',}
  ;
    const token = createSecretToken(user)
  const item = await  Item.create({
    title:'ball',
    description:'object',
    category:"sport",
    price:50,
    image:'geh.jpg'
  }) 

 
  const response = await request(app)
    .post('/addtocart')
    .set('Authorization', `Bearer ${token}`)
    .send({
      itemId:item._id.toString()
    });

  
  expect(response.status).toBe(200);

  expect(response.body).toHaveProperty('message', 'Item added to Cart!');

});
