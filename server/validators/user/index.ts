import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'

export class LoginBody {
  @MinLength(2)
  id: string

  @MinLength(4)
  pass: string
}

export class UpsertUserInfoBody {
  @IsEmail()
  email: string

  @MaxLength(255)
  name: string

  @IsOptional()
  @IsString()
  icon: string
}
