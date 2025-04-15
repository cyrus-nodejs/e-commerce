import request from 'supertest'
import app from '../src'

import {Order} from '../models/Order'
import {User} from '../models/User'
import { Item } from '../models/Item'

import { createSecretToken } from '../middlewares/jwt/createSecretToken'

const user =  User.create({ email: 'goat@gmail.com', firstname: 'laver', lastname:'pork' });
const token =  createSecretToken(user)


describe('GET /allorders', () => {
    it('should return all products', async () => {
      const response = await request(app).get('/allorders');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });



  describe('POST /createorder', () => {
    it('should create a new product', async () => {
      const newOrder = {
        shipping: 50,
        gift: 10,
        clientSecret: 'q37redyufuifsudsa',
       
      };
    
      const response = await request(app).post('/createorder').set("Authorization", `Bearer ${token}`).send(newOrder);
      expect(response.status).toBe(201);
      expect(response.body.title).toBe(newOrder.shipping);

      const order= await Order.findOne({ clientSecret: 'q37redyufuifsudsa' });
      expect(order).not.toBeNull();
      expect(order?.items.length).toBe(1);
    });
  });



