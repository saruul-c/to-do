import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.utils';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Input validation logic
    if (!req.body.title || typeof req.body.title !== 'string') {
        return res.status(400).json({ error: 'String өгөгдөл таарсангүй' });
    }

    // Token verification logic
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Tatgalzlaa. Token baihgui baina.');
    }

    try {
        const decoded = verifyToken(token); 
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(400).send('Token tohirsongui.');
    }
};
