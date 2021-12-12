import type { User } from '$prisma/client'
import { UpsertUserInfoBody } from '$/validators'
import { depend } from 'velona'
import { userRepository } from '$/repository/user'

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
