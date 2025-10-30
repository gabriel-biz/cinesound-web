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
