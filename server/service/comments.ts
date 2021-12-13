import { depend } from 'velona'
import { commentsRepository } from '$/repository/comments'
import { CreateCommentBody, UpdateCommentBody } from '$/validators'
import { Comment } from '.prisma/client'

export const getComments = depend(
  { commentsRepository },
  async ({ commentsRepository }, limit?: number) => {
    return (await commentsRepository.findMany()).slice(0, limit)
  }
)

export const getComment = depend(
  { commentsRepository },
  async ({ commentsRepository }, id?: Comment['id']) =>
    commentsRepository.findUnique(id)
)

export const createComment = depend(
  { commentsRepository },
  async ({ commentsRepository }, body: CreateCommentBody) => {
    return await commentsRepository.create(body)
  }
)

export const updateComment = depend(
  { commentsRepository },
  async ({ commentsRepository }, id: Comment['id'], body: UpdateCommentBody) =>
    commentsRepository.update(id, body)
)

export const deleteComment = depend(
  { commentsRepository },
  async ({ commentsRepository }, id: Comment['id']) =>
    commentsRepository.delete(id)
)
