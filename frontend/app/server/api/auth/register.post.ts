import { createError, readBody } from 'h3'
import { db, toAuthUser } from '../_mockDb'

interface RegisterBody {
  name?: string
  email?: string
  password?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<RegisterBody>(event)

  if (!body?.name || !body?.email || !body?.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Nome, e-mail e senha são obrigatórios.'
    })
  }

  const email = body.email.toLowerCase()

  if (db.users.has(email)) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Este e-mail já está cadastrado.'
    })
  }

  const newUserId = db.nextUserId++

  const storedUser = {
    id: newUserId,
    name: body.name,
    email,
    password: body.password
  }

  db.users.set(email, storedUser)

  return {
    success: true,
    message: 'Cadastro realizado com sucesso.',
    user: toAuthUser(storedUser)
  }
})
