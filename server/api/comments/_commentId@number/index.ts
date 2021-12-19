import { AuthHeader } from '$/types'
import { UpdateCommentBody } from '$/validators'
import type { Comment } from '$prisma/client'

export type Methods = {
  get: {
    resBody: Comment
  }
  patch: {
    reqHeaders: AuthHeader
    reqBody: UpdateCommentBody
    resBody: { message: string }
  }
  delete: {
    reqHeaders: AuthHeader
    resBody: { message: string }
  }
}
