import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'

export class CreatePostBody {
  @IsNumber()
  @IsNotEmpty()
  authorId: number

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  title: string

  @IsString()
  @MaxLength(3000)
  @IsNotEmpty()
  body: string
}

export class UpdatePostBody {
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(255)
  title: string

  @IsString()
  @IsOptional()
  @MaxLength(3000)
  body: string
}
