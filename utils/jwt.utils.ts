// utils/jwt.utils.ts
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key';

export interface UserPayload {
  userId: number;
  username: string;
}

export const generateJWT = (user: UserPayload): string => {
  return jwt.sign({ userId: user.userId, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyJWT = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
};

export const generateRefreshToken = (user: UserPayload): string => {
  return jwt.sign({ userId: user.userId, username: user.username }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

export const verifyRefreshToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload;
  } catch (error) {
    console.error('Refresh token verification failed:', error);
    return null;
  }
};
