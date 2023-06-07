import 'dotenv/config'
import { fastify } from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify()
const portServer: number = 3333

app.register(cors, { origin: true })
app.register(jwt, { secret: 'spacetime' })
app.register(multipart)
app.register(memoriesRoutes)
app.register(authRoutes)
app.register(uploadRoutes)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app
  .listen({
    port: portServer,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(
      '🚀 HTTP server running on port ' + `http://localhost:${portServer}`,
    )
  })
  .catch((err) => console.error('Server not running 😥, cause' + err))
