import { getPosts, createPost } from '$/service/posts'
import { defineController } from './$relay'

export default defineController(
  { getPosts, createPost },
  ({ getPosts, createPost }) => ({
    get: async ({ query }) => {
      const posts = await getPosts(query?.limit)

      if (posts) {
        return { status: 200, body: await getPosts(query?.limit) }
      }

      return {
        status: 404,
        body: { message: 'No Posts Found' }
      }
    },
    post: async ({ body }) => {
      try {
        return {
          status: 201,
          body: await createPost(body)
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
