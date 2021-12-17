import { prisma } from '$/lib/prismaClient'
import { Post, Prisma } from '.prisma/client'

export const postsRepository = {
  findUnique: async (id?: Post['id']) => {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        comment: true
      }
    })
  },
  findMany: async () => {
    return await prisma.post.findMany({
      include: {
        author: true,
        comment: true
      },
      orderBy: {
        createdAt: 'desc'
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
