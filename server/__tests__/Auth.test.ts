import request from 'supertest'
import app from '../src/index'
import { beforeAll, afterAll, describe, test,it, expect } from '@jest/globals';
import { User } from '../models/User';
describe('Auth', () => {
  it('should login with valid credentials', async () => {
    // First register or create user directly in DB
   const reg = await request(app).post('/register').send({
    username: 'test@example.com',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(reg.status).toBe(200);
   

    const res = await request(app).post('/login').send({
      username: 'test@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(200);
    expect(res.body.eToken).toBeDefined();
    console.log(res.body)
  });
});
