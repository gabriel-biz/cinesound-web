import { createError, readBody, setResponseStatus } from 'h3'
import { createMovie } from '../_mockDb'

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

  const movie = createMovie({
    title: body.title,
    description: body.description
  })

  setResponseStatus(event, 201)

  return movie
})
