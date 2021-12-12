import { defineHooks } from './$relay'

export type AdditionalRequest = {
  params: {
    name: string
    email: string
  }
}

export default defineHooks(() => ({
  onRequest: (request, reply) =>
    request.jwtVerify().catch((err) => reply.send(err))
}))
