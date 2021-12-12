import type { AuthHeader } from '$/types'
import { UpsertUserInfoBody } from '$/validators'
import { User } from '$prisma/client'

export type Methods = {
  get: {
    reqHeaders: AuthHeader
    query?: {
      id?: number
    }
    resBody: User
  }
  post: {
    reqHeaders: AuthHeader
    reqBody: UpsertUserInfoBody
    resBody: User
  }
}
