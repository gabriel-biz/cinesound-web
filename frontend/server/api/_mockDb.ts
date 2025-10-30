export interface StoredUser {
  id: number
  name: string
  email: string
  password: string
}

export interface MovieRecord {
  id: number
  title: string
  description: string
  createdAt: string
}

export interface MusicRecord {
  id: number
  title: string
  artist: string
  createdAt: string
}

export interface CreateMovieInput {
  title: string
  description: string
}

export interface CreateMusicInput {
  title: string
  artist: string
}

interface MockDatabase {
  users: Map<string, StoredUser>
  movies: MovieRecord[]
  music: MusicRecord[]
  nextUserId: number
  nextMovieId: number
  nextMusicId: number
}

const mockDatabase: MockDatabase = {
  users: new Map<string, StoredUser>(),
  movies: [],
  music: [],
  nextUserId: 1,
  nextMovieId: 1,
  nextMusicId: 1
}

const seedDatabase = () => {
  if (mockDatabase.users.size > 0 || mockDatabase.movies.length > 0 || mockDatabase.music.length > 0) {
    return
  }

  const defaultUser: StoredUser = {
    id: mockDatabase.nextUserId++,
    name: 'Louvor Sereno',
    email: 'adorador@cinesound.dev',
    password: 'adoracao123'
  }

  mockDatabase.users.set(defaultUser.email.toLowerCase(), defaultUser)

  mockDatabase.movies.push(
    {
      id: mockDatabase.nextMovieId++,
      title: 'Aurora da Fé',
      description: 'Um documentário contemplativo sobre jornadas espirituais ao nascer do sol.',
      createdAt: new Date().toISOString()
    },
    {
      id: mockDatabase.nextMovieId++,
      title: 'Notas de Esperança',
      description: 'Drama musical que celebra a união de uma comunidade através da adoração.',
      createdAt: new Date().toISOString()
    }
  )

  mockDatabase.music.push(
    {
      id: mockDatabase.nextMusicId++,
      title: 'Brisa da Manhã',
      artist: 'Coral Horizonte',
      createdAt: new Date().toISOString()
    },
    {
      id: mockDatabase.nextMusicId++,
      title: 'Luz sobre as Águas',
      artist: 'Ministério Aurora',
      createdAt: new Date().toISOString()
    }
  )
}

seedDatabase()

export const db = mockDatabase

export const toAuthUser = (user: StoredUser) => ({
  id: user.id,
  name: user.name,
  email: user.email
})

export const listMovies = () => [...mockDatabase.movies]

export const createMovie = ({ title, description }: CreateMovieInput): MovieRecord => {
  const movie: MovieRecord = {
    id: mockDatabase.nextMovieId++,
    title,
    description,
    createdAt: new Date().toISOString()
  }

  mockDatabase.movies.unshift(movie)

  return movie
}

export const removeMovie = (id: number) => {
  const index = mockDatabase.movies.findIndex((movie) => movie.id === id)

  if (index === -1) {
    return false
  }

  mockDatabase.movies.splice(index, 1)
  return true
}

export const listMusic = () => [...mockDatabase.music]

export const createMusic = ({ title, artist }: CreateMusicInput): MusicRecord => {
  const music: MusicRecord = {
    id: mockDatabase.nextMusicId++,
    title,
    artist,
    createdAt: new Date().toISOString()
  }

  mockDatabase.music.unshift(music)

  return music
}

export const removeMusic = (id: number) => {
  const index = mockDatabase.music.findIndex((music) => music.id === id)

  if (index === -1) {
    return false
  }

  mockDatabase.music.splice(index, 1)
  return true
}
