import { AuthHeader } from '$/types'
import { CreatePostBody } from '$/validators'
import type { Post, Comment, User } from '$prisma/client'

export type Methods = {
  get: {
    reqHeaders: AuthHeader
    query?: {
      limit?: number
    }
    resBody: Array<Post & { comment?: Comment[] } & { author?: User | null }>
  }
  post: {
    reqHeaders: AuthHeader
    reqBody: CreatePostBody
    resBody: Post
  }
}
