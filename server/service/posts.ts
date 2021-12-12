import { depend } from 'velona'
import { postsRepository } from '$/repository/posts'
import { CreatePostBody, UpdatePostBody } from '$/validators'
import { Post } from '.prisma/client'

export const getPosts = depend(
  { postsRepository },
  async ({ postsRepository }, limit?: number) => {
    return (await postsRepository.getPosts()).slice(0, limit)
  }
)

export const getPost = depend(
  { postsRepository },
  async ({ postsRepository }, id: Post['id']) => postsRepository.getPost(id)
)

export const createPost = depend(
  { postsRepository },
  async ({ postsRepository }, body: CreatePostBody) => {
    return await postsRepository.createPost(body)
  }
)

export const updatePost = depend(
  { postsRepository },
  async ({ postsRepository }, id: Post['id'], body: UpdatePostBody) =>
    postsRepository.updatePost(id, body)
)

export const deletePost = depend(
  { postsRepository },
  async ({ postsRepository }, id: Post['id']) => postsRepository.deletePost(id)
)
