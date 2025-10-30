<template>
  <div class="space-y-8">
    <div class="space-y-2 text-center">
      <h1 class="text-2xl font-semibold text-slate-800 dark:text-slate-100">Crie sua conta</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Junte-se à comunidade e organize seus favoritos com serenidade.
      </p>
    </div>

    <UAlert
      v-if="auth.error"
      color="red"
      icon="i-heroicons-exclamation-triangle"
      variant="soft"
      :title="auth.error"
    />

    <UForm :state="form" class="space-y-5" @submit="handleSubmit">
      <UFormGroup label="Nome" name="name" required>
        <UInput
          v-model="form.name"
          type="text"
          placeholder="Seu nome completo"
          autocomplete="name"
          size="lg"
        />
      </UFormGroup>

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
          placeholder="Crie uma senha forte"
          autocomplete="new-password"
          size="lg"
        />
      </UFormGroup>

      <div class="space-y-4">
        <UButton
          color="worship"
          type="submit"
          block
          :loading="auth.loading"
          icon="i-heroicons-user-plus"
        >
          Cadastrar
        </UButton>

        <p class="text-center text-sm text-slate-500 dark:text-slate-400">
          Já possui uma conta?
          <NuxtLink to="/login" class="font-semibold text-worship-600 hover:text-worship-500">
            Fazer login
          </NuxtLink>
        </p>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { onMounted, reactive } from 'vue'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

const form = reactive({
  name: '',
  email: '',
  password: ''
})

const handleSubmit = async (event: FormSubmitEvent<typeof form>) => {
  const { name, email, password } = event.data

  try {
    await auth.register({ name, email, password })
    await navigateTo({
      path: '/login',
      query: { registered: '1' }
    })
  } catch (error) {
    console.error('Falha ao cadastrar usuário', error)
  }
}

onMounted(() => {
  if (auth.isAuthenticated) {
    navigateTo('/')
  }
})

definePageMeta({
  layout: 'auth'
})
</script>
