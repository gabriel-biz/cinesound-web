<template>
  <div class="space-y-10">
    <section class="rounded-3xl border border-worship-200/60 bg-white/80 p-8 shadow-xl backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/70">
      <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div class="space-y-3">
          <p class="text-sm uppercase tracking-[0.3em] text-worship-500">CineSound</p>
          <h1 class="text-3xl font-semibold text-slate-800 md:text-4xl dark:text-slate-100">
            Um santuário sereno para seus favoritos
          </h1>
          <p class="max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Reúna filmes e músicas que tocam seu coração em um espaço tranquilo, com curadoria acolhedora e organizada.
          </p>
        </div>
        <div class="flex flex-col items-center gap-3 text-center md:w-72">
          <div class="rounded-2xl bg-gradient-to-br from-worship-100 via-lilac-100 to-white p-5 text-worship-700 shadow-inner dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-900">
            <p class="text-sm font-medium uppercase tracking-[0.2em]">Coleções</p>
            <p class="mt-2 text-3xl font-semibold">{{ totalFavoritos }}</p>
          </div>
          <div class="flex gap-2">
            <UButton color="worship" variant="soft" icon="i-heroicons-film" to="/movies">
              Filmes
            </UButton>
            <UButton color="worship" variant="soft" icon="i-heroicons-musical-note" to="/music">
              Músicas
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <section class="grid gap-8 lg:grid-cols-2">
      <UCard class="bg-white/70 dark:bg-slate-950/60">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100">Filmes em destaque</h2>
            <UButton color="worship" variant="ghost" to="/movies" icon="i-heroicons-arrow-right">
              Ver todos
            </UButton>
          </div>
        </template>

        <div v-if="moviesPending" class="flex justify-center py-8">
          <ULoading size="lg" color="worship" />
        </div>
        <div v-else class="space-y-4">
          <div
            v-if="!movies?.length"
            class="rounded-2xl border border-dashed border-worship-200/70 bg-worship-50/40 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400"
          >
            Nenhum filme cadastrado ainda. Comece adicionando seus favoritos.
          </div>
          <ul v-else class="space-y-3">
            <li v-for="movie in moviesPreview" :key="movie.id" class="flex items-start gap-3">
              <span class="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-worship-100 text-worship-600">
                <UIcon name="i-heroicons-film" />
              </span>
              <div>
                <p class="font-semibold text-slate-700 dark:text-slate-100">{{ movie.title }}</p>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ movie.description }}</p>
              </div>
            </li>
          </ul>
        </div>
      </UCard>

      <UCard class="bg-white/70 dark:bg-slate-950/60">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100">Músicas em destaque</h2>
            <UButton color="worship" variant="ghost" to="/music" icon="i-heroicons-arrow-right">
              Ver todas
            </UButton>
          </div>
        </template>

        <div v-if="musicPending" class="flex justify-center py-8">
          <ULoading size="lg" color="worship" />
        </div>
        <div v-else class="space-y-4">
          <div
            v-if="!music?.length"
            class="rounded-2xl border border-dashed border-worship-200/70 bg-worship-50/40 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400"
          >
            Nenhuma música adicionada ainda. Que tal registrar sua próxima inspiração?
          </div>
          <ul v-else class="space-y-3">
            <li v-for="song in musicPreview" :key="song.id" class="flex items-start gap-3">
              <span class="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-lilac-100 text-lilac-600">
                <UIcon name="i-heroicons-musical-note" />
              </span>
              <div>
                <p class="font-semibold text-slate-700 dark:text-slate-100">{{ song.title }}</p>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ song.artist }}</p>
              </div>
            </li>
          </ul>
        </div>
      </UCard>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

useHead({
  title: 'Favoritos',
  meta: [
    {
      name: 'description',
      content: 'Visualize destaques das suas coleções de filmes e músicas com a atmosfera serena do CineSound.'
    }
  ]
})

interface MovieItem {
  id: number
  title: string
  description: string
}

interface MusicItem {
  id: number
  title: string
  artist: string
}

const {
  data: movies,
  pending: moviesPending
} = await useFetch<MovieItem[]>('/api/movies', {
  default: () => []
})

const {
  data: music,
  pending: musicPending
} = await useFetch<MusicItem[]>('/api/music', {
  default: () => []
})

const moviesPreview = computed(() => (movies.value ?? []).slice(0, 3))
const musicPreview = computed(() => (music.value ?? []).slice(0, 3))
const totalFavoritos = computed(() => (movies.value?.length ?? 0) + (music.value?.length ?? 0))

definePageMeta({
  middleware: ['auth']
})
</script>
