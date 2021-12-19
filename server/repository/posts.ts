import { prisma } from '$/lib/prismaClient'
import { Post, Prisma } from '.prisma/client'

export const findUnique = async (id?: Post['id']) => {
  return await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      comment: {
        include: {
          owner: true
        }
      }
    }
  })
}

export const findMany = async () => {
  return await prisma.post.findMany({
    include: {
      author: true,
      comment: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export const create = async (body: Prisma.PostCreateInput) => {
  return await prisma.post.create({
    data: body
  })
}

export const update = async (id: Post['id'], body: Prisma.PostUpdateInput) => {
  return await prisma.post.update({
    where: { id },
    data: body
  })
}

export const remove = async (id: Post['id']) => {
  return prisma.post.delete({
    where: { id }
  })
}
