import { JwtPayload } from 'jsonwebtoken';
import { DecodedToken } from '../typings/decodeToken';

declare module 'express-serve-static-core' {
  interface Request {
    user: DecodedToken | JwtPayload; 
  }
}