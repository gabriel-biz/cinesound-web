import { listMovies } from '../_mockDb'

export default defineEventHandler(() => {
  return listMovies()
})
