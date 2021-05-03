import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/enums/user.enum';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(14)
  readonly username: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role;
}
