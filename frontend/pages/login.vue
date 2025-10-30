<template>
  <div class="space-y-8">
    <div class="space-y-2 text-center">
      <h1 class="text-2xl font-semibold text-slate-800 dark:text-slate-100">Bem-vindo de volta</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Entre para acessar seu espaço de filmes e músicas favoritos.
      </p>
    </div>

    <UAlert
      v-if="successMessage"
      color="worship"
      icon="i-heroicons-sparkles"
      variant="soft"
      :title="successMessage"
    />

    <UAlert
      color="gray"
      icon="i-heroicons-information-circle"
      variant="soft"
      title="Acesso rápido"
      description="Para explorar rapidamente, use adorador@cinesound.dev com a senha adoracao123."
    />

    <UAlert
      v-if="auth.error"
      color="red"
      icon="i-heroicons-exclamation-triangle"
      variant="soft"
      :title="auth.error"
    />

    <UForm :state="form" class="space-y-5" @submit="handleSubmit">
      <UFormGroup label="E-mail" name="email" required>
        <UInput
          v-model="form.email"
          type="email"
          placeholder="voce@exemplo.com"
          autocomplete="email"
          size="lg"
        />
      </UFormGroup>

      <UFormGroup label="Senha" name="password" required>
        <UInput
          v-model="form.password"
          type="password"
          placeholder="••••••••"
          autocomplete="current-password"
          size="lg"
        />
      </UFormGroup>

      <div class="space-y-4">
        <UButton
          color="worship"
          type="submit"
          block
          :loading="auth.loading"
          icon="i-heroicons-arrow-right-circle"
        >
          Entrar
        </UButton>

        <p class="text-center text-sm text-slate-500 dark:text-slate-400">
          Ainda não tem conta?
          <NuxtLink to="/register" class="font-semibold text-worship-600 hover:text-worship-500">
            Cadastre-se
          </NuxtLink>
        </p>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { onMounted, reactive, ref, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const route = useRoute()

const form = reactive({
  email: '',
  password: ''
})

const successMessage = ref('')

const handleSubmit = async (event: FormSubmitEvent<typeof form>) => {
  const { email, password } = event.data

  try {
    await auth.login({ email, password })
    const redirectPath = Array.isArray(route.query.redirect) ? route.query.redirect[0] : route.query.redirect
    await navigateTo(redirectPath || '/')
  } catch (error) {
    console.error('Falha ao realizar login', error)
  }
}

watch(
  () => route.query.registered,
  (registered) => {
    if (!registered) {
      successMessage.value = ''
      return
    }

    successMessage.value = 'Cadastro realizado com sucesso! Faça login para continuar.'
  },
  { immediate: true }
)

onMounted(() => {
  if (auth.isAuthenticated) {
    navigateTo('/')
  }
})

definePageMeta({
  layout: 'auth'
})
</script>
