import { User } from '@modules/user/domain/entity/user.entity';

export class LoginRequestDTO {
  email: string;
  password: string;
}

export type LoginDTO = {
  email: string;
  password: string;
};

export class UserPayload extends User {
  accessToken: string;
}
