import { User } from '$prisma/client'
import { atom } from 'recoil'

export const userInitialState = atom({
  key: 'userState',
  default: {} as User
})
