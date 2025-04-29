import {Item} from '../models/Item'
import {getAllItems} from '../controllers/item'


jest.mock("../models/Item")

describe('Product Controller - getAllProducts', () => {
    it('should return a list of products', async () => {
      const req = {};
      const res = {
        json: jest.fn()
      };
  
      const mockProducts = [{ name: 'Product 1' }, { name: 'Product 2' }];
      Item.find.mockResolvedValue(mockProducts);
  
      await getAllProducts(req, res);
      expect(res.json).toHaveBeenCalledWith(mockProducts);
    });
  });