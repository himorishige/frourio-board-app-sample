import { depend } from 'velona'
import {
  findUnique,
  findMany,
  create,
  update,
  remove
} from '$/repository/posts'
import { CreatePostBody, UpdatePostBody } from '$/validators'
import { Post } from '.prisma/client'

export const getPosts = depend(
  { findMany },
  async ({ findMany }, limit?: number) => {
    return (await findMany()).slice(0, limit)
  }
)

export const getPost = depend(
  { findUnique },
  async ({ findUnique }, id?: Post['id']) => findUnique(id)
)

export const createPost = depend(
  { create },
  async ({ create }, body: CreatePostBody) => {
    return await create(body)
  }
)

export const updatePost = depend(
  { update },
  async ({ update }, id: Post['id'], body: UpdatePostBody) => update(id, body)
)

export const deletePost = depend(
  { remove },
  async ({ remove }, id: Post['id']) => remove(id)
)
