import { listMusic } from '../_mockDb'

export default defineEventHandler(() => {
  return listMusic()
})
