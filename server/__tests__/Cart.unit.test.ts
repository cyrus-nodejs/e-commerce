import {Cart} from '../models/Cart'
import {addToCart} from '../controllers/Cart'


jest.mock('../models/cartModel');

describe('Cart Controller - createCart', () => {
  it('should create a cart and return it', async () => {
    const req = {
      body: {
        owner: 'user123',
        items: [{  title: 'Item1',
          price: 10,
          description:'Item description',
          category: 'goat',
          unit:1,
          image: 'test.jpg',
          trending: false,
          recommended: false,
          topfeatured: false,
          topdeals: false, 
         }],
        bill:45
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Cart.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(req.body)
    }));

    await createCart(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });
});
