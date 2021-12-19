import { depend } from 'velona'
import {
  findMany,
  findUnique,
  create,
  update,
  remove
} from '$/repository/comments'
import { CreateCommentBody, UpdateCommentBody } from '$/validators'
import { Comment } from '.prisma/client'

export const getComments = depend(
  { findMany },
  async ({ findMany }, limit?: number) => {
    return (await findMany()).slice(0, limit)
  }
)

export const getComment = depend(
  { findUnique },
  async ({ findUnique }, id?: Comment['id']) => findUnique(id)
)

export const createComment = depend(
  { create },
  async ({ create }, body: CreateCommentBody) => {
    return await create(body)
  }
)

export const updateComment = depend(
  { update },
  async ({ update }, id: Comment['id'], body: UpdateCommentBody) =>
    update(id, body)
)

export const deleteComment = depend(
  { remove },
  async ({ remove }, id: Comment['id']) => remove(id)
)
