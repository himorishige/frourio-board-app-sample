import { AuthHeader } from '$/types'
import { CreateCommentBody } from '$/validators'
import type { Comment } from '$prisma/client'

export type Methods = {
  get: {
    resBody: Comment[]
  }
  post: {
    reqHeaders: AuthHeader
    reqBody: CreateCommentBody
    resBody: Comment
  }
}
