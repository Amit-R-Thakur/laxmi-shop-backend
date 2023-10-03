import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  Matches,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class SignupDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required.' })
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Invalid email' })
  email?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Mobile is required.' })
  @IsString({ message: 'Invalid mobile number' })
  @Matches(/^\+?[0-9]*$/, { message: 'Invalid mobile number' }) // Modify the regex as needed
  mobile?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required.' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(3, { message: 'Password is too short (minimum 3 characters)' })
  @MaxLength(8, { message: 'Password is too long (maximum 8 characters)' })
  password: string;
}
