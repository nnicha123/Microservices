import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

// Want to add additional property (currentUser) to Request which may or may not be defined (hence the ?)
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // saying if req.session is defined, check the jwt property (กันไม่ได้ define)
  if (!req.session?.jwt) {
    return next();
  }
  try {
    // Extract info from payload
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}
  next();
};
