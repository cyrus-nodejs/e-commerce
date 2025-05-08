import request from 'supertest'
import app from '../src/index'
import { Item } from '../models/Item';
import { beforeAll, afterAll, test,it, expect } from '@jest/globals';




let user;

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
  console.log(res.body)
},30000);

it('should upload item after login', async () => {


  const res = await request(app)
    .post('/add/item')
    .set('Cookie', [`eToken=${token}`]) //.set('Authorization', `Bearer ${token}`)
    .send({
        title:'ball',
        description:'object',
        category:"sport",
        price:50,
        image:'geh.jpg'
    });

  expect(res.status).toBe(200);
//   expect(res.body.item.length).toBeGreaterThan(0);
});
