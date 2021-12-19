import { prisma } from '$/lib/prismaClient'
import { Comment, Prisma } from '.prisma/client'

export const findUnique = async (id?: Comment['id']) => {
  return await prisma.comment.findUnique({
    where: { id }
  })
}

export const findMany = async () => {
  return await prisma.comment.findMany()
}
export const create = async (body: Prisma.CommentCreateInput) => {
  return await prisma.comment.create({
    data: body
  })
}
export const update = async (
  id: Comment['id'],
  body: Prisma.CommentUpdateInput
) => {
  return await prisma.comment.update({
    where: { id },
    data: body
  })
}
export const remove = async (id: Comment['id']) => {
  return prisma.comment.delete({
    where: { id }
  })
}
