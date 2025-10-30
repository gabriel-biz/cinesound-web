import { createError, getRouterParam } from 'h3'
import { removeMovie } from '../_mockDb'

export default defineEventHandler((event) => {
  const idParam = getRouterParam(event, 'id')
  const id = Number.parseInt(idParam || '', 10)

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Identificador inválido.'
    })
  }

  const removed = removeMovie(id)

  if (!removed) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Filme não encontrado.'
    })
  }

  return {
    success: true
  }
})
