import { createComment, getComments } from '$/service/comments'
import { defineController } from './$relay'

export default defineController(
  { createComment, getComments },
  ({ createComment, getComments }) => ({
    get: async () => {
      const posts = await getComments()

      if (posts) {
        return { status: 200, body: await getComments() }
      }

      return {
        status: 404,
        body: { message: 'No Comments Found' }
      }
    },
    post: async ({ body }) => {
      try {
        return {
          status: 201,
          body: await createComment(body)
        }
      } catch (error) {
        return {
          status: 500,
          body: { message: error.message }
        }
      }
    }
  })
)
