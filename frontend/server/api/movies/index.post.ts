import { createError, readBody } from 'h3'
import { db } from '../_mockDb'

interface CreateMovieBody {
  title?: string
  description?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateMovieBody>(event)

  if (!body?.title || !body?.description) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Título e descrição são obrigatórios.'
    })
  }

  const movie = {
    id: db.nextMovieId++,
    title: body.title,
    description: body.description,
    createdAt: new Date().toISOString()
  }

  db.movies.unshift(movie)

  return movie
})
