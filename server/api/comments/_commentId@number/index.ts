import { UpdateCommentBody } from '$/validators'
import type { Comment } from '$prisma/client'

export type Methods = {
  get: {
    resBody: Comment
  }
  patch: {
    reqBody: UpdateCommentBody
    resBody: { message: string }
  }
  delete: {
    resBody: { message: string }
  }
}
