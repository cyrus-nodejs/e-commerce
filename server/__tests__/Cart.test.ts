
import request from 'supertest'
import app from '../src/index'
import { beforeAll, afterAll, test,it, expect } from '@jest/globals';
import { Item } from '../models/Item';

let token: string;
let itemData;


beforeAll(async () => {
  await request(app).post('/register').send({
    username: 'test@example.com',
    email: 'test@example.com',
    password: 'password123',
  }, );

  const res = await request(app).post('/login').send({
    username: 'test@example.com',
    password: 'password123',
  });

  token = res.body.eToken;
 
  console.log(res.body)
 
}, 80000);

it('should add item to cart after login', async () => {
  const item = {
    title:'ball',
    description:'object',
    category:"sport",
    price:50,
    image:'geh.jpg'
  }
  const itemData = new Item(item) 
   itemData.save()
  const response = await request(app)
    .post('/addtocart')
    .set('Cookie', [`eToken=${token}`]) //.set('Authorization', `Bearer ${token}`)
    .send({
      itemId:itemData._id
    });

  
    expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('message', 'Item added to Cart!');

});
