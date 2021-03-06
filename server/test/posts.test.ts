import fastify from 'fastify'
import controller from '$/api/posts/controller'
import { Role } from '$prisma/client'

const dummyUser = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'hoge@example.comn',
  name: 'Hoge',
  icon: 'src',
  role: Role.ADMIN
}

const dummyComment = {
  id: 1,
  body: 'body',
  createdAt: new Date(),
  updatedAt: new Date(),
  ownerId: 1,
  postId: 1,
  owner: dummyUser
}

const dummyPost = {
  id: 1,
  title: 'title',
  body: 'body',
  createdAt: new Date(),
  updatedAt: new Date(),
  authorId: 1,
  comment: [dummyComment],
  author: dummyUser
}

test('dependency injection into controller', async () => {
  const injectedController = controller.inject((deps) => ({
    getPosts: deps.getPosts.inject({
      findMany: () => {
        return Promise.resolve([dummyPost, dummyPost])
      }
    })
  }))(fastify())

  const limit = 3
  const res = await injectedController.get({
    headers: { authorization: '' },
    query: { limit }
  })

  expect(res.body).toHaveLength(limit)
})
