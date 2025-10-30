import { createError, readBody } from 'h3'
import { db, toAuthUser, type StoredUser } from '../_mockDb'

interface LoginBody {
  email?: string
  password?: string
}

const findUserByEmail = (email: string): StoredUser | undefined => {
  return db.users.get(email.toLowerCase())
}

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginBody>(event)

  if (!body?.email || !body?.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'E-mail e senha são obrigatórios.'
    })
  }

  const user = findUserByEmail(body.email)

  if (!user || user.password !== body.password) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Credenciais inválidas. Verifique seus dados.'
    })
  }

  return {
    token: `mock-token-${user.id}`,
    user: toAuthUser(user)
  }
})
