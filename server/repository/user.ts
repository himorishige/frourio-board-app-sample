import { prisma } from '$/lib/prismaClient'
import type { Prisma, User } from '$prisma/client'

export const userRepository = {
  findUnique: async (id?: User['id']) => {
    return await prisma.user.findUnique({
      where: { id }
    })
  },
  upsert: async (body: Prisma.UserUpdateInput & Prisma.UserCreateInput) => {
    return await prisma.user.upsert({
      where: {
        email: body.email
      },
      update: { name: body.name, icon: body.icon },
      create: { name: body.name, email: body.email, icon: body.icon }
    })
  }
}
