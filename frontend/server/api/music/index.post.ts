import { createError, readBody } from 'h3'
import { db } from '../_mockDb'

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

  const song = {
    id: db.nextMusicId++,
    title: body.title,
    artist: body.artist,
    createdAt: new Date().toISOString()
  }

  db.music.unshift(song)

  return song
})
