import jwt from 'jsonwebtoken';
import { envs } from './env';


const tokenOps = {
  createToken: (payload): string => {
    return jwt.sign(payload, envs.JWT_ACCESS_TOKEN as string, { expiresIn: '1h' });
  },

  verifyAccessToken: (token: string) => {
    return jwt.verify(token, envs.JWT_ACCESS_TOKEN as string)
  },

  decodeAccessToken: (token: string) => {
    return jwt.decode(token);
  }
};

export default tokenOps;