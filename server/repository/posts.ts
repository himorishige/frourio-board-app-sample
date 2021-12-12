import { prisma } from '$/lib/prismaClient'
import { CreatePostBody } from '$/validators'
import { Post, Prisma } from '.prisma/client'

export const postsRepository = {
  getPost: async (id: Post['id']) => {
    return await prisma.post.findUnique({
      where: { id }
    })
  },
  getPosts: async () => {
    return await prisma.post.findMany()
  },
  createPost: async (body: CreatePostBody) => {
    return await prisma.post.create({
      data: body
    })
  },
  updatePost: async (id: Post['id'], body: Prisma.PostUpdateInput) => {
    return await prisma.post.update({
      where: { id },
      data: body
    })
  },
  deletePost: async (id: Post['id']) =>
    prisma.post.delete({
      where: { id }
    })
}
