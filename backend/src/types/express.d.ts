import { Types } from 'mongoose';

export interface AuthRequest extends Request {
  user: { userId: string };
}
