import { CreatePostBody } from '$/validators'
import type { Post } from '$prisma/client'

export type Methods = {
  get: {
    query?: {
      limit?: number
    }

    resBody: Post[]
  }
  post: {
    reqBody: CreatePostBody
    resBody: Post
  }
}
