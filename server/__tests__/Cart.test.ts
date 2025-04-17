import request from 'supertest'
import app from '../src'
import mongoose from 'mongoose'
import {Cart} from '../models/Cart'
import {User} from '../models/User'
import { Item } from '../models/Item'
import {describe, expect, test, it} from '@jest/globals';
import { createSecretToken } from '../middlewares/jwt/createSecretToken'
const user =  User.create({ email: 'goat@gmail.com', firstname: 'laver', lastname:'pork' });

const token =  createSecretToken(user)

describe('GET /getcart', () => {
    it('should return owner cart', async () => {
      const response = await request(app).get('/getcart').set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);

    });
  });



  describe('POST /addtocart', () => {
    it('should create a new product', async () => {
     const  newitem ={
        title: 'Item1',
        price: 10,
        description:'Item description',
        category: 'goat',
        unit:1,
        image: 'test.jpg',
        trending: false,
        recommended: false,
        topfeatured: false,
        topdeals: false,
     
        }
    const item = await Item.create(newitem);
    const user =  User.create({ email: 'goat@gmail.com', password:"labasd", firstname: 'laver', lastname:'pork' });
      const newCart = {
        itemId: item._id,
      };
    
      const response = await request(app).post('/addtocart').set("Authorization", `Bearer ${token}`).send(newCart);
      expect(response.status).toBe(200);
      
    });
  });
