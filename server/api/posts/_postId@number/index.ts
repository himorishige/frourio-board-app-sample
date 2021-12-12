import { UpdatePostBody } from '$/validators'
import type { Post } from '$prisma/client'

export type Methods = {
  get: {
    resBody: Post
  }
  patch: {
    reqBody: UpdatePostBody
    resBody: { message: string }
  }
  delete: {
    resBody: { message: string }
  }
}
