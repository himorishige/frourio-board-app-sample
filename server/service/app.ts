import server from '$/$server'
import {
  API_BASE_PATH,
  API_UPLOAD_DIR,
  AUTH0_AUDIENCE,
  AUTH0_DOMAIN,
  AUTH0_SECRET
} from '$/service/envValues'
import Fastify, { FastifyServerFactory } from 'fastify'
import { fastifyAuth0Verify } from 'fastify-auth0-verify'
import cors from 'fastify-cors'
import helmet from 'fastify-helmet'
import fastifyStatic from 'fastify-static'
import path from 'path'

export const init = (serverFactory?: FastifyServerFactory) => {
  const app = Fastify({ serverFactory })
  app.register(helmet)
  app.register(cors)
  app.register(fastifyStatic, {
    root: path.join(__dirname, 'static'),
    prefix: '/static/'
  })
  if (API_UPLOAD_DIR) {
    app.after(() => {
      app.register(fastifyStatic, {
        root: path.resolve(__dirname, API_UPLOAD_DIR),
        prefix: '/upload/',
        decorateReply: false
      })
    })
  }
  app.register(fastifyAuth0Verify, {
    domain: AUTH0_DOMAIN,
    secret: AUTH0_SECRET,
    audience: AUTH0_AUDIENCE
  })
  server(app, { basePath: API_BASE_PATH })
  return app
}
