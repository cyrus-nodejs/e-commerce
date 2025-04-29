import request from 'supertest'
import app from '../src'
import {describe, expect, test, it} from '@jest/globals';
import {Order} from '../models/Order'
import {User} from '../models/User'
import { Item } from '../models/Item'

import { createSecretToken } from '../middlewares/jwt/createSecretToken'

const user =  User.create({ email: 'goat@gmail.com', firstname: 'laver', lastname:'pork' });
const token =  createSecretToken(user)

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Order.deleteMany();
  await Product.deleteMany();
});

describe('Order API', () => {
  it('should create an order and retrieve it by user', async () => {
    const product = await Product.create({ name: 'TV', price: 300 });
    const userId = new mongoose.Types.ObjectId();

    const orderData = {
      userId,
      products: [{ productId: product._id, quantity: 2 }],
      totalAmount: 600,
      address: '123 Main Street'
    };

    const createRes = await request(app).post('/api/orders').send(orderData);
    expect(createRes.statusCode).toBe(201);
    expect(createRes.body.totalAmount).toBe(600);

    const getRes = await request(app).get(`/api/orders/${userId}`);
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body.length).toBe(1);
    expect(getRes.body[0].products[0].productId.name).toBe('TV');
  });

  it('should update the order status', async () => {
    const product = await Product.create({ name: 'Camera', price: 250 });
    const order = await Order.create({
      userId: new mongoose.Types.ObjectId(),
      products: [{ productId: product._id, quantity: 1 }],
      totalAmount: 250,
      address: '456 Elm St',
      status: 'pending'
    });

    const res = await request(app)
      .put(`/api/orders/status/${order._id}`)
      .send({ status: 'shipped' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('shipped');
  });
});


// describe('GET /allorders', () => {
//     it('should return all products', async () => {
//       const response = await request(app).get('/allorders');
//       expect(response.status).toBe(200);
//       expect(response.body).toBeInstanceOf(Array);
//     });
//   });



//   describe('POST /createorder', () => {
//     it('should create a new product', async () => {
//       const newOrder = {
//         shipping: 50,
//         gift: 10,
//         clientSecret: 'q37redyufuifsudsa',
       
//       };
    
//       const response = await request(app).post('/createorder').set("Authorization", `Bearer ${token}`).send(newOrder);
//       expect(response.status).toBe(201);
//       expect(response.body.title).toBe(newOrder.shipping);

//       const order= await Order.findOne({ clientSecret: 'q37redyufuifsudsa' });
//       expect(order).not.toBeNull();
//       expect(order?.items.length).toBe(1);
//     });
//   });



