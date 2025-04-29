const { createOrder } = require('../controllers/order');
const Order = require('../models/Order');

jest.mock('../models/orderModel');

describe('Order Controller - createOrder', () => {
  it('should create and return an order', async () => {
    const req = {
      body: {
        userId: 'user123',
        products: [{ productId: 'product123', quantity: 1 }],
        totalAmount: 100,
        address: '789 Maple Ave'
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Order.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(req.body)
    }));

    await createOrder(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });
});