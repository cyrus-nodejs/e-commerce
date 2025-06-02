import request from 'supertest'
import app from '../src/server'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import {  describe, it, expect } from '@jest/globals';

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'testsecret');
}

describe('Auth', () => {
  it('should login with valid credentials', async () => {
    // First register or create user directly in DB
    
  const userId = new mongoose.Types.ObjectId().toHexString();
  const token = generateToken(userId);

   const reg = await request(app).post('/register').send({
    firstname:'men',
    lastname:"here",
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
