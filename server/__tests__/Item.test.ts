import request from 'supertest'
import app from '../src/server'
import { Item } from '../models/Item';
import { beforeAll, afterAll, test,it, expect } from '@jest/globals';
import { createSecretToken } from '../middlewares/jwt/createSecretToken'
import mongoose from 'mongoose'





it('should upload item after login', async () => {
 const userId = new mongoose.Types.ObjectId().toHexString()
    const user = { firstname:'men',
      _id:userId,
      lastname:"here",
      username: 'test@example.com',
        email: 'test@example.com',
        password: 'password123',}
  ;
    const token = createSecretToken(user)

  const res = await request(app)
    .post('/add/item')
    .set('Authorization', `Bearer ${token}`)
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
