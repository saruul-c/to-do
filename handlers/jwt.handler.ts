// import jwt, { JwtPayload } from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
// const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key';

// export const generateJWT = (user: { id: number; username: string }) => {
//   return jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
// };

// export const verifyJWT = (token: string): JwtPayload | null => {
//   try {
//     return jwt.verify(token, JWT_SECRET) as JwtPayload;
//   } catch (error) {
//     return null;
//   }
// };

// export const generateRefreshToken = (user: { id: number; username: string }) => {
//   return jwt.sign({ userId: user.id, username: user.username }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
// };

// export const verifyRefreshToken = (token: string): JwtPayload | null => {
//   try {
//     return jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload;
//   } catch (error) {
//     return null;
//   }
// };
