<template>
  <header
    class="sticky top-0 z-20 border-b border-worship-200/60 bg-white/80 shadow-sm backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80"
  >
    <UContainer class="flex items-center justify-between gap-6 py-4">
      <div class="flex items-center gap-4">
        <NuxtLink
          to="/"
          class="text-lg font-semibold tracking-wide text-slate-700 transition hover:text-worship-600 dark:text-slate-200 dark:hover:text-worship-400"
        >
          CineSound
        </NuxtLink>
        <UHorizontalNavigation
          :links="navLinks"
          class="hidden md:block"
          :ui="{
            inactive: 'text-slate-500 hover:text-worship-600/80 dark:text-slate-400',
            active: 'text-worship-600 dark:text-worship-300',
            base: 'font-medium'
          }"
        />
      </div>

      <div class="flex items-center gap-3">
        <span v-if="displayName" class="hidden text-sm text-slate-600 md:block dark:text-slate-300">
          Olá, {{ displayName }}
        </span>
        <UButton color="worship" variant="soft" icon="i-heroicons-arrow-right-on-rectangle" @click="emitLogout">
          Sair
        </UButton>
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits<{ logout: [] }>()

const auth = useAuthStore()

const navLinks = computed(() => [
  {
    label: 'Favoritos',
    icon: 'i-heroicons-heart',
    to: '/',
    exact: true
  },
  {
    label: 'Filmes',
    icon: 'i-heroicons-film',
    to: '/movies'
  },
  {
    label: 'Músicas',
    icon: 'i-heroicons-musical-note',
    to: '/music'
  }
])

const displayName = computed(() => auth.user?.name ?? '')

const emitLogout = () => {
  emit('logout')
}
</script>
