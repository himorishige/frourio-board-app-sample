import { prisma } from '$/lib/prismaClient'
import { Post, Prisma } from '.prisma/client'

export const postsRepository = {
  findUnique: async (id?: Post['id']) => {
    return await prisma.post.findUnique({
      where: { id }
    })
  },
  findMany: async () => {
    return await prisma.post.findMany({
      include: {
        comment: true
      }
    })
  },
  create: async (body: Prisma.PostCreateInput) => {
    return await prisma.post.create({
      data: body
    })
  },
  update: async (id: Post['id'], body: Prisma.PostUpdateInput) => {
    return await prisma.post.update({
      where: { id },
      data: body
    })
  },
  delete: async (id: Post['id']) =>
    prisma.post.delete({
      where: { id }
    })
}
