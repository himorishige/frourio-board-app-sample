import { AuthHeader } from '$/types'
import { UpdatePostBody } from '$/validators'
import type { Post, User, Comment } from '$prisma/client'

export type Methods = {
  get: {
    reqHeaders: AuthHeader
    resBody: Post & { comment: Comment[] } & { author: User | null }
  }
  patch: {
    reqBody: UpdatePostBody
    resBody: { message: string }
  }
  delete: {
    resBody: { message: string }
  }
}
