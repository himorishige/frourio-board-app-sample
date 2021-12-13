import { CreateCommentBody } from '$/validators'
import type { Comment } from '$prisma/client'

export type Methods = {
  get: {
    resBody: Comment[]
  }
  post: {
    reqBody: CreateCommentBody
    resBody: Comment
  }
}
