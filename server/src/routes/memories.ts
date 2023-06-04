import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return memories.map((memorie) => {
      return {
        id: memorie.id,
        coverUrl: memorie.coverUrl,
        excerpt: memorie.content.substring(0, 115).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)
    const memmory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return memmory
  })

  app.post('/memories', async (request) => {
    const bodySechema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySechema.parse(request.body)

    const memmory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: '1cdf4e16-1f10-47b4-a087-2d579c511bef',
      },
    })

    return memmory
  })

  app.put('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySechema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySechema.parse(request.body)

    const memory = await prisma.memory.update({
      where: { id },
      data: { content, coverUrl, isPublic },
    })

    return memory
  })

  app.delete('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)
    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
