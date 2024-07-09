import jwt from 'jsonwebtoken';
import { envs } from './env';
//import sendError from '../constants/errors';


interface UserPayload {
    name: string;
    email: string;
    password: string;
}

const tokenOps = {
    createToken: (payload): string => {
        return jwt.sign(payload, envs.JWT_ACCESS_TOKEN as string, { expiresIn: '1h' });
    },

    verifyAccessToken: (token: string) => {
        return jwt.verify(token, envs.JWT_ACCESS_TOKEN as string)
    },

    decodeAccessToken: (token: string): UserPayload | null => {
        try {
            const decoded = jwt.verify(token, envs.JWT_ACCESS_TOKEN) as UserPayload;
            return decoded;
        } catch (error) {
            console.error('Token verification failed:', error);
            return null;
        }
    }

}    
export default tokenOps;