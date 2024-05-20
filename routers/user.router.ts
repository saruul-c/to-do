// routers/user.router.ts
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { generateJWT, verifyRefreshToken, UserPayload } from '../utils/jwt.utils';

const { login, register, forgotPassword, resetPassword } = UserController;

export const userRouter = Router();

userRouter.get('/', (req, res) => {
  console.log('test');
  res.send('Hello User');
});

userRouter.post('/refresh-token', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    console.log('Refresh token is required');
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  const decoded = verifyRefreshToken(refreshToken);

  if (!decoded) {
    console.log('Invalid or expired refresh token');
    return res.status(401).json({ message: 'Invalid or expired refresh token' });
  }

  const userPayload: UserPayload = { userId: decoded.userId, username: decoded.username };
  const accessToken = generateJWT(userPayload);

  console.log('New access token generated:', accessToken);
  res.status(200).json({ accessToken });
});

userRouter.post('/login', login);
userRouter.get('/forgotPassword', forgotPassword);
userRouter.get('/resetPassword', resetPassword);
userRouter.post('/register', register);

export default userRouter;
