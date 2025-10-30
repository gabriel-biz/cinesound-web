import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

type Nullable<T> = T | null

export interface AuthUser {
  id: number
  name: string
  email: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterPayload extends LoginCredentials {
  name: string
}

interface LoginResponse {
  token: string
  user: AuthUser
}

const STORAGE_KEY = 'cinesound-auth'

const resolveErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object') {
    const maybeData = (error as { data?: unknown }).data
    if (typeof maybeData === 'string') {
      return maybeData
    }
    if (maybeData && typeof maybeData === 'object' && 'message' in maybeData) {
      return String((maybeData as { message: unknown }).message)
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Não foi possível completar a ação. Tente novamente.'
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<Nullable<AuthUser>>(null)
  const token = ref<Nullable<string>>(null)
  const loading = ref(false)
  const error = ref<Nullable<string>>(null)
  const hydrated = ref(false)

  const setSession = ({ user: userPayload, token: tokenPayload }: LoginResponse) => {
    user.value = userPayload
    token.value = tokenPayload
  }

  const clearSession = () => {
    user.value = null
    token.value = null
  }

  const hydrate = () => {
    if (!import.meta.client || hydrated.value) {
      return
    }

    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as LoginResponse
        if (parsed.user && parsed.token) {
          setSession(parsed)
        }
      } catch (err) {
        console.warn('Não foi possível restaurar a sessão salva.', err)
      }
    }

    hydrated.value = true
  }

  if (import.meta.client) {
    hydrate()

    watch(
      [user, token],
      ([nextUser, nextToken]) => {
        if (!hydrated.value) {
          return
        }

        if (!nextUser || !nextToken) {
          localStorage.removeItem(STORAGE_KEY)
          return
        }

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            user: nextUser,
            token: nextToken
          })
        )
      },
      { deep: true }
    )
  }

  const isAuthenticated = computed(() => Boolean(user.value && token.value))

  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: credentials
      })

      setSession(response)
      return response
    } catch (err) {
      error.value = resolveErrorMessage(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const register = async (payload: RegisterPayload) => {
    loading.value = true
    error.value = null

    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: payload
      })
    } catch (err) {
      error.value = resolveErrorMessage(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    clearSession()
    if (import.meta.client) {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return {
    user,
    token,
    loading,
    error,
    hydrated,
    isAuthenticated,
    hydrate,
    login,
    register,
    logout
  }
})
