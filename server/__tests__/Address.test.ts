// import request from 'supertest'
// import app from '../src'
 
// import {User} from '../models/User'

 import { Address } from '../models/Address'



import request from 'supertest'
import app from '../src/index'
import { beforeAll, afterAll, test,it, expect } from '@jest/globals';
import { User } from '../models/User';
import e from 'express';

let token: string;


beforeAll(async () => {
    await request(app).post('/register').send({
        username: 'test@example.com',
        email: 'test@example.com',
        password: 'password123',
      }, );
      
  const res = await request(app).post('/login').send({
    username: 'test@example.com',
    password: 'password123',
  });

  token = res.body.eToken;
  console.log(res.body)
}, 80000);

it('should add address after login', async () => {
    const address = {
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
  const addressData = new Address(address) 
   addressData.save()
  const res = await request(app)
    .post('/createaddress')
    .set('Cookie', [`eToken=${token}`]) //.set('Authorization', `Bearer ${token}`)
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
//   expect(res.body.address.length).toBeGreaterThan(0);
});

// describe('GET /getaddress', () => {
//     const user =  User.create({ email: 'goat@gmail.com', firstname: 'laver', lastname:'pork' });
//     const userid = user._id
//     it('should return owner cart', async () => {
//       const response = await request(app).get('/getaddress').send(userid);
//       expect(response.status).toBe(200);
//       expect(response.body).toBeInstanceOf(Object);
//     });
//   });



//   describe('POST /createaddress', () => {
//     it('should create a new product', async () => {
  
//     const user = await User.create({ email: 'goat@gmail.com', firstname: 'laver', lastname:'pork' });
//       const newAddress = {
//         owner : user._id,
//          firstname: 'alex', 
//          lastname:'godspower', 
//          mobile:'0706023136', 
//          mobile2:'08068074568', 
//          address:'malete', 
//          nation:"bankok", 
//          region:"bangladesh", 
//          postalcode:'24001',
//          province:"kelo", 
//          ordernote:"herp"
//       };
    
//       const response = await request(app).post('/createaddress').send(newAddress);
//       expect(response.status).toBe(201);
//       expect(response.body.title).toBe(newAddress.firstname);

//       const cart = await Address.findOne({ title: 'Item1' });
//       expect(cart).not.toBeNull();
//       expect(cart?.items.length).toBe(1);
//     });
//   });
