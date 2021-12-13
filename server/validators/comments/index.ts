import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length
} from 'class-validator'

export class CreateCommentBody {
  @IsNumber()
  @IsNotEmpty()
  ownerId: number

  @IsNumber()
  @IsNotEmpty()
  postId: number

  @IsString()
  @IsNotEmpty()
  @Length(1, 1000, { message: '1〜1000文字で入力してください' })
  body: string
}

export class UpdateCommentBody {
  @IsString()
  @IsOptional()
  @Length(1, 1000, { message: '1〜3000文字で入力してください' })
  body: string
}
