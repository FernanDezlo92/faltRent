import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { Request, Response, NextFunction } from 'express';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ error: "Access Denied: No Token Provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(403).json({ error: "Invalid Token" });
  }
}