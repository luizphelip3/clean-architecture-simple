export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  phone?: string;
  private: boolean;
}
