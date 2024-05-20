// middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt.utils";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try{
    const decoded = verifyJWT(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
  req.user = decoded;
  next();
  } catch (error) {
    res.status(400).send('Token tohirsongui.');
  } 
};
