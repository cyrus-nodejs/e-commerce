

import request from 'supertest'
import app from '../src/server'
import { it, expect } from '@jest/globals';
import { createSecretToken } from '../middlewares/jwt/createSecretToken'
import mongoose from 'mongoose'



it('should add address after login', async () => {
  
const userId = new mongoose.Types.ObjectId().toHexString()
  const user = { firstname:'men',
    id:userId,
    lastname:"here",
    username: 'test@example.com',
      email: 'test@example.com',
      password: 'password123',}
;
  const token = createSecretToken(user)


  const res = await request(app)
    .post('/createaddress')
    .set('Authorization', `Bearer ${token}`)
    .send({
        firstname: 'alex', 
        lastname:'godspower', 
        mobile:'0706023136', 
        mobile2:'08068074568', 
        address:'malete', 
        nation:"bankok", 
        region:"bangladesh", 
        postalcode:'24001',
        province:"kelo", 
        ordernote:"herp"
    });

  expect(res.status).toBe(200);
 
});

