import { CreatePostBody } from '$/validators'
import type { Post, Comment } from '$prisma/client'

export type Methods = {
  get: {
    query?: {
      limit?: number
    }

    resBody: Array<Post & { comment?: Comment[] }>
  }
  post: {
    reqBody: CreatePostBody
    resBody: Post
  }
}
