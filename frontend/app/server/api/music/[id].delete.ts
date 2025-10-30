import { createError, getRouterParam } from 'h3'
import { removeMusic } from '../_mockDb'

export default defineEventHandler((event) => {
  const idParam = getRouterParam(event, 'id')
  const id = Number.parseInt(idParam || '', 10)

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Identificador inválido.'
    })
  }

  const removed = removeMusic(id)

  if (!removed) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Música não encontrada.'
    })
  }

  return {
    success: true
  }
})
