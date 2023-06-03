import { fastify } from 'fastify';
import { PrismaClient } from '@prisma/client';

const portServer: number = 3333;
const app = fastify();
const prisma = new PrismaClient();

app.get('/users', async () => {
  const users = await prisma.user.findMany();
  return users;
});

app
  .listen({
    port: portServer,
  })
  .then(() => {
    console.log(
      '🚀 HTTP server running on port ' + `http://localhost:${portServer}`
    );
  })
  .catch((err) => console.error('Server not running 😥, cause' + err));
