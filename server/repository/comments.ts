import { prisma } from '$/lib/prismaClient'
import { Comment, Prisma } from '.prisma/client'

export const commentsRepository = {
  findUnique: async (id?: Comment['id']) => {
    return await prisma.comment.findUnique({
      where: { id }
    })
  },
  findMany: async () => {
    return await prisma.comment.findMany()
  },
  create: async (body: Prisma.CommentCreateInput) => {
    return await prisma.comment.create({
      data: body
    })
  },
  update: async (id: Comment['id'], body: Prisma.CommentUpdateInput) => {
    return await prisma.comment.update({
      where: { id },
      data: body
    })
  },
  delete: async (id: Comment['id']) =>
    prisma.comment.delete({
      where: { id }
    })
}
