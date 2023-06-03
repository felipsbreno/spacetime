import { fastify } from 'fastify';

const portServer: number = 3333;
const app = fastify();

app.get('/hello', () => {
  return 'HTTP/1.1 200 OK';
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
