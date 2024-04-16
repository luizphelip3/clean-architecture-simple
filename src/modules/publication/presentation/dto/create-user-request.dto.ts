import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePublicationRequestDTO {
  @IsNotEmpty({ message: 'description should not be empty' })
  @IsString({ message: 'description should be a string' })
  description: string;
}
