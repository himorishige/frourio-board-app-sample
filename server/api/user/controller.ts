import { getUserInfoById, upsertUserInfo } from '$/service/user'
import { defineController } from './$relay'

export default defineController(
  { getUserInfoById, upsertUserInfo },
  ({ getUserInfoById, upsertUserInfo }) => ({
    get: async ({ query }) => {
      const user = await getUserInfoById(query?.id)
      return user ? { status: 200, body: user } : { status: 404 }
    },
    post: async ({ body }) => {
      return {
        status: 201,
        body: await upsertUserInfo(body)
      }
    }
  })
)
