import request from 'supertest'
import app from '../src'
import {describe, expect, test, it} from '@jest/globals';

import {User} from '../models/User'

import { Address } from '../models/Address'



describe('GET /getaddress', () => {
    const user =  User.create({ email: 'goat@gmail.com', firstname: 'laver', lastname:'pork' });
    const userid = user._id
    it('should return owner cart', async () => {
      const response = await request(app).get('/getaddress').send(userid);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });
  });



  describe('POST /createaddress', () => {
    it('should create a new product', async () => {
  
    const user = await User.create({ email: 'goat@gmail.com', firstname: 'laver', lastname:'pork' });
      const newAddress = {
        owner : user._id,
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
      };
    
      const response = await request(app).post('/createaddress').send(newAddress);
      expect(response.status).toBe(201);
      expect(response.body.title).toBe(newAddress.firstname);

      const cart = await Address.findOne({ title: 'Item1' });
      expect(cart).not.toBeNull();
      expect(cart?.items.length).toBe(1);
    });
  });
