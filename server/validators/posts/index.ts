import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length
} from 'class-validator'

export class CreatePostBody {
  @IsNumber()
  @IsNotEmpty()
  authorId: number

  @IsString()
  @IsNotEmpty()
  @Length(1, 255, { message: '1〜255文字で入力してください' })
  title: string

  @IsString()
  @IsNotEmpty()
  @Length(1, 3000, { message: '1〜3000文字で入力してください' })
  body: string
}

export class UpdatePostBody {
  @IsString()
  @IsOptional()
  @Length(1, 255, { message: '1〜255文字で入力してください' })
  title: string

  @IsString()
  @IsOptional()
  @Length(1, 3000, { message: '1〜3000文字で入力してください' })
  body: string
}
