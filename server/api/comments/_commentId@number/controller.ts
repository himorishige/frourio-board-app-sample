import { defineController } from './$relay'
import { updateComment, deleteComment, getComment } from '$/service/comments'

export default defineController(
  { updateComment, deleteComment, getComment },
  ({ updateComment, deleteComment, getComment }) => ({
    get: async ({ params }) => {
      const comment = await getComment(params.commentId)
      if (comment) {
        return {
          status: 200,
          body: comment
        }
      }
      return {
        status: 404,
        body: { message: 'Not Found' }
      }
    },
    patch: async ({ body, params }) => {
      try {
        await updateComment(params.commentId, body)
        return { status: 200, body: { message: 'OK' } }
      } catch (error) {
        return {
          status: 500,
          body: { message: error.message }
        }
      }
    },
    delete: async ({ params }) => {
      try {
        await deleteComment(params.commentId)
        return { status: 200, body: { message: 'OK' } }
      } catch (error) {
        return {
          status: 500,
          body: { message: error.message }
        }
      }
    }
  })
)
