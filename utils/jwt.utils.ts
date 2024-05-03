// utils/jwt.utils.ts
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'default_secret_key';

export const generateToken = (userId: number): string => {
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string): jwt.JwtPayload | string => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        console.log('Error verifying token:', error);
        throw new Error('Invalid token');
    }
};
