import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordUserRequestDTO {
  @IsNotEmpty({ message: 'Actual password should not be empty' })
  @IsString({ message: 'Actual password should be a string' })
  actualPassword: string;

  @IsNotEmpty({ message: 'New password should not be empty' })
  @IsString({ message: 'New password should be a string' })
  newPassword: string;
}
