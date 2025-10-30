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

  const index = db.movies.findIndex((movie) => movie.id === id)

  if (index === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Filme não encontrado.'
    })
  }

  db.movies.splice(index, 1)

  return {
    success: true
  }
})
