import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'
const app = fastify()

const portServer: number = 3333

app.register(cors, { origin: true })
app.register(memoriesRoutes)
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
