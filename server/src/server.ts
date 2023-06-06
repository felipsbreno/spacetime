import 'dotenv/config'
import { fastify } from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
const app = fastify()

const portServer: number = 3333

app.register(cors, { origin: true })
app.register(jwt, { secret: 'spacetime' })
app.register(memoriesRoutes)
app.register(authRoutes)
app
  .listen({
    port: portServer,
  })
  .then(() => {
    console.log(
      '🚀 HTTP server running on port ' + `http://localhost:${portServer}`,
    )
  })
  .catch((err) => console.error('Server not running 😥, cause' + err))
