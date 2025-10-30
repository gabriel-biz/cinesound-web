import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  if (import.meta.server) {
    return
  }

  auth.hydrate()

  if (auth.isAuthenticated) {
    return
  }

  const redirectPath = !['/login', '/register'].includes(to.path) ? to.fullPath : undefined

  return navigateTo({
    path: '/login',
    query: redirectPath ? { redirect: redirectPath } : undefined
  })
})
