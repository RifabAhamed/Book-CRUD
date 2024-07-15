import jwt from 'jsonwebtoken';
import Token from '../models/Token.js';
import { successResponse, errorResponse } from '../utils/responseUtil.js';

const secretKey = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return errorResponse(res, 'Token is missing', 401);
  }

  try {
    const verified = jwt.verify(token, secretKey, { ignoreExpiration: true });

    // Check if the token is stored in the database
    const storedToken = await Token.findOne({ userId: verified.userId, token });
    if (!storedToken) {
      return errorResponse(res, 'Invalid session. Token has been invalidated.', 401);
    }

    // Check token expiration
    const currentTime = Math.floor(Date.now() / 1000);
    if (verified.exp < currentTime) {
      await Token.deleteOne({ userId: verified.userId, token }); // Remove expired token
      return errorResponse(res, 'Token has expired', 401);
    }

    req.user = verified;
    next();
  } catch (err) {
    console.log(err)
    return errorResponse(res, 'Invalid token', 400);
  }
};

export default authMiddleware;
