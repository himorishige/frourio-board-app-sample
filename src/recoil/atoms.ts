import { atom, useRecoilState } from 'recoil'
import { User } from '$prisma/client'

export const userInitialState = atom({
  key: 'userState',
  default: {} as User
})
