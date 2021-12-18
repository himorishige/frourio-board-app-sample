import { AuthHeader } from '$/types'
import { UpdatePostBody } from '$/validators'
import type { Post, User, Comment } from '$prisma/client'

export type Methods = {
  get: {
    reqHeaders: AuthHeader
    resBody: Post & { comment: Array<Comment & { owner?: User | null }> } & {
      author: User | null
    }
  }
  patch: {
    reqHeaders: AuthHeader
    reqBody: UpdatePostBody
    resBody: { message: string }
  }
  delete: {
    reqHeaders: AuthHeader
    resBody: { message: string }
  }
}
