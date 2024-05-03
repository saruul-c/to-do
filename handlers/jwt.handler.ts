// handlers/jwt.handler.ts
import jwt from 'jsonwebtoken';

export const generateJWT = (user: { id: number; username: string }) => {
  return jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1h' }
  );
};

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
  } catch (error) {
    return null;
  }
};
