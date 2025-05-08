import request from 'supertest'
import app from '../src/index'
import { beforeAll, afterAll, test,it, expect } from '@jest/globals';
import { Item } from '../models/Item';
import { Cart } from '../models/Cart';
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
   const item = {
      title:'ball',
      description:'object',
      category:"sport",
      price:50,
      image:'geh.jpg'
    }
    const itemData = new Item(item) 
     itemData.save()
     const res = await request(app)
     .post('/addtocart')
     .set('Cookie', [`eToken=${token}`]) //.set('Authorization', `Bearer ${token}`)
     .send({
       ItemId: itemData._id,
     });
     expect(res.status).toBe(200);
 
  const order = {
    gift: 10,
    shipping:15,
     clientSecret:"63hgreurhr"
  };

  const response = await request(app)
    .post('/createorder')
    .set('Cookie', [`eToken=${token}`]) //.set('Authorization', `Bearer ${token}`)
    .send(order);


    expect(res.status).toBe(200);
  // expect(resOrder.body.order).toBeDefined();
  // expect(resOrder.body.order.items.length).toBe(1);
});
