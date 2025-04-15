import request from 'supertest'
import app from '../src/index'

import { User } from '../models/User'



import { createSecretToken } from '../middlewares/jwt/createSecretToken'

const user =  User.create({ email: 'goat@gmail.com', firstname: 'laver', lastname:'pork' });
const userid = user.id
const token =  createSecretToken(user)





  describe('GET /user', () => {
    it('should return login user', async () => {
      const response =  (await request(app).post('/').set("Authorization", `Bearer ${token}`))
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });



  describe('POST /register', () => {
    it('should create a new product', async () => {
      const newUser = {
        firstname:'Harry',
        lastname: 'maguire',
        email: 'harry@getMaxListeners.com',
        password:'dghfjj1'
      };
    
      const response = await request(app).post('/register').send(newUser);
      expect(response.status).toBe(201);
      expect(response.body.firstname.toBe(newUser.firstname));

      const item = await User.findOne({ firstname: 'Harry' });
      expect(item).not.toBeNull();
      expect(item?.items.length).toBe(1);
    });
  });


