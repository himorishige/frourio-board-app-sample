import { userRepository } from '$/repository/user'
import { UpsertUserInfoBody } from '$/validators'
import type { User } from '$prisma/client'
import { depend } from 'velona'

export const getUserInfoById = depend(
  { userRepository },
  async ({ userRepository }, id?: User['id']) => {
    return userRepository.findUnique(id)
  }
)

export const upsertUserInfo = depend(
  { userRepository },
  async ({ userRepository }, body: UpsertUserInfoBody) => {
    return userRepository.upsert(body)
  }
)
