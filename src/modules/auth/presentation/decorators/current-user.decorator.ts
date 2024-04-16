import { User } from '@modules/user/domain';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from './interface/auth-request';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
