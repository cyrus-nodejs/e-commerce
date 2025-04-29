import passport from 'passport'
import mockReqRes from 'mock-req-res'
import {userAuthorization} from '../middlewares/jwt/verifyToken'
const mockReqRes = require('mock-req-res');

const { authenticateJWT } = require('../middleware/authMiddleware'); // Assuming you have a middleware that checks JWT

describe('Authentication Middleware', () => {
  it('should pass if user is authenticated', async () => {
    const req = mockReqRes();
    req.user = { id: 'validUserId' }; // Simulating a user being authenticated by Passport
    
    const res = mockReqRes();
    const next = jest.fn();
    
    await userAuthorization(req, res, next); // Assuming you have an JWT auth middleware that uses Passport

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should reject if no user is authenticated', async () => {
    const req = mockReqRes();
    const res = mockReqRes();
    const next = jest.fn();
    
    await authenticateJWT(req, res, next);

    expect(res.statusCode).toBe(401); // Unauthorized
    expect(res._getData()).toBe('Unauthorized');
  });
});