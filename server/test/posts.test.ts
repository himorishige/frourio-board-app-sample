import fastify from 'fastify'
import controller from '$/api/posts/controller'

const dummyComment = {
  id: 1,
  body: 'body',
  createdAt: new Date(),
  updatedAt: new Date(),
  ownerId: 1,
  postId: 1
}

const dummyPost = {
  id: 1,
  title: 'title',
  body: 'body',
  createdAt: new Date(),
  updatedAt: new Date(),
  authorId: 1,
  comment: [dummyComment]
}

test('dependency injection into controller', async () => {
  const injectedController = controller.inject((deps) => ({
    getPosts: deps.getPosts.inject({
      postsRepository: {
        findMany: () => {
          return Promise.resolve([dummyPost, dummyPost])
        },
        findUnique: () => {
          return Promise.resolve(dummyPost)
        },
        create: () => {
          return Promise.resolve(dummyPost)
        },
        delete: () => {
          return Promise.resolve(dummyPost)
        },
        update: () => {
          return Promise.resolve(dummyPost)
        }
      }
    })
  }))(fastify())

  const limit = 3
  const res = await injectedController.get({
    query: { limit }
  })

  expect(res.body).toHaveLength(limit)
})
