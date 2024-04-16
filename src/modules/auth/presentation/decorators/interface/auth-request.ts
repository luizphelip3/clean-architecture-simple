import { User } from '@modules/user/domain';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: User;
}
