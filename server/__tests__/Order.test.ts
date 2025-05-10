import request from 'supertest'
import app from '../src/server'
import { beforeAll, afterAll, test,it, expect } from '@jest/globals';
import { Item } from '../models/Item';
import { Cart } from '../models/Cart';
import { createSecretToken } from '../middlewares/jwt/createSecretToken'
import mongoose from 'mongoose'
import { timeStamp } from 'node:console';
let token: string;


beforeAll(async () => {
  await request(app).post('/register').send({
    username: 'test@example.com',
    email: 'test@example.com',
    password: 'password123',
  });

  const res = await request(app).post('/login').send({
    username: 'test@example.com',
    password: 'password123',
  });

  token = res.body.eToken;
}, 30000);

it('should create an order after login', async () => {
   

     const userId = new mongoose.Types.ObjectId().toHexString()
        const user = { firstname:'men',
          _id:userId,
          lastname:"here",
          username: 'test@example.com',
            email: 'test@example.com',
            password: 'password123',}
      ;
      const item = await  Item.create({
        title:'ball',
        description:'object',
        category:"sport",
        price:50,
        image:'geh.jpg'
      }) 
    
        const token = createSecretToken(user)
        const cart = await  Cart.create({
          owner:userId,
          items:[item],
          bills:40,
        }) 

  const res = await request(app)
    .post('/createorder')
    .set('Authorization', `Bearer ${token}`)
    .send(
      {
        gift: 10,
        shipping:15,
         clientSecret:"63hgreurhr"
      }
    );


    expect(res.status).toBe(200);
  // expect(resOrder.body.order).toBeDefined();
  // expect(resOrder.body.order.items.length).toBe(1);
});
