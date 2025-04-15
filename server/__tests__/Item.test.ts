import request from 'supertest'
import app from '../src/index'

import { Item } from '../models/Item'








  describe('GET /allitems', () => {
    it('should return all products', async () => {
        const newProduct = {
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
         
          };
          const product = new Item(newProduct)
         await product.save();
         
      const response = await request(app).get('/allitems');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });
  });



  describe('POST /add/item', () => {
    it('should create a new product', async () => {
      const newProduct = {
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
     
      };
    
      const response = await request(app).post('/add/item').send(newProduct);
      expect(response.status).toBe(200);
     
      

    });
  });


