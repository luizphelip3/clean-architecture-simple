import { User } from '@modules/user/domain';

export type CreatePublicationDTO = {
  user: User;
  description: string;
};
