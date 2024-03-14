import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserRequestDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString({ message: 'Name should be a string' })
  name: string;

  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsString({ message: 'Email should be a string' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString({ message: 'Password should be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(22, { message: 'Password must have maximum 22 characters' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must have at least one lowercase letter, one uppercase letter, one special character, and one number',
  })
  password: string;

  @IsString({ message: 'Phone should be a string' })
  @IsOptional()
  phone?: string;

  @IsNotEmpty({ message: 'Privacy should be defined' })
  isPrivate: boolean;
}

export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  isPrivate: boolean;
};
