import { prisma } from '$/lib/prismaClient'
import { UpsertUserInfoBody } from '$/validators'
import type { User } from '$prisma/client'

export const userRepository = {
  findUnique: async (id?: User['id']) => {
    return await prisma.user.findUnique({
      where: { id }
    })
  },
  upsertUser: async (body: UpsertUserInfoBody) => {
    return await prisma.user.upsert({
      where: {
        email: body.email
      },
      update: { name: body.name, icon: body.icon },
      create: { name: body.name, email: body.email, icon: body.icon }
    })
  }
}
