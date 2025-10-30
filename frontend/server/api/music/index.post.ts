import { createError, readBody, setResponseStatus } from 'h3'
import { createMusic } from '../_mockDb'

interface CreateSongBody {
  title?: string
  artist?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateSongBody>(event)

  if (!body?.title || !body?.artist) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Título e artista são obrigatórios.'
    })
  }

  const song = createMusic({
    title: body.title,
    artist: body.artist
  })

  setResponseStatus(event, 201)

  return song
})
