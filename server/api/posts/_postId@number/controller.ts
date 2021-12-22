import { deletePost, getPost, updatePost } from '$/service/posts'
import { defineController } from './$relay'

export default defineController(
  { updatePost, deletePost, getPost },
  ({ updatePost, deletePost, getPost }) => ({
    get: async ({ params }) => {
      const post = await getPost(params.postId)
      if (post) {
        return {
          status: 200,
          body: post
        }
      }
      return {
        status: 404,
        body: { message: 'Not Found' }
      }
    },
    patch: async ({ body, params }) => {
      try {
        await updatePost(params.postId, body)
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
        await deletePost(params.postId)
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
