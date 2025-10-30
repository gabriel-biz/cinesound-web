import { db } from '../_mockDb'

export default defineEventHandler(() => {
  return db.movies
})
