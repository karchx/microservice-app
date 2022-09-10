import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * User create request Object
 */
export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
