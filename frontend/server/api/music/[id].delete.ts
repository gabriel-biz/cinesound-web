import { createError, getRouterParam } from 'h3'
import { db } from '../_mockDb'

export default defineEventHandler((event) => {
  const idParam = getRouterParam(event, 'id')
  const id = Number.parseInt(idParam || '', 10)

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Identificador inválido.'
    })
  }

  const index = db.music.findIndex((song) => song.id === id)

  if (index === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Música não encontrada.'
    })
  }

  db.music.splice(index, 1)

  return {
    success: true
  }
})
