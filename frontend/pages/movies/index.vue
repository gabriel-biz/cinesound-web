<template>
  <div class="space-y-8">
    <header class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="space-y-1">
        <p class="text-sm font-medium uppercase tracking-[0.3em] text-worship-500">Coleção</p>
        <h1 class="text-3xl font-semibold text-slate-800 dark:text-slate-100">Filmes</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Cadastre produções que inspiram momentos de adoração e contemplação.
        </p>
      </div>
      <UButton color="worship" icon="i-heroicons-plus" @click="openCreate">
        Novo filme
      </UButton>
    </header>

    <UCard class="bg-white/70 dark:bg-slate-950/60">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100">Lista de filmes</h2>
          <UButton color="worship" variant="ghost" icon="i-heroicons-arrow-path" :loading="isRefreshing" @click="refreshList">
            Atualizar
          </UButton>
        </div>
      </template>

      <div v-if="pending" class="flex justify-center py-10">
        <ULoading size="lg" color="worship" />
      </div>
      <div v-else>
        <div
          v-if="!movies?.length"
          class="rounded-2xl border border-dashed border-worship-200/70 bg-worship-50/40 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400"
        >
          Nenhum filme registrado ainda. Clique em "Novo filme" para começar sua curadoria.
        </div>

        <ul v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <li v-for="movie in movies" :key="movie.id" class="h-full">
            <ItemCard label="Filme" :title="movie.title" :description="movie.description" icon="i-heroicons-heart">
              <template #actions>
                <div class="flex items-center gap-2">
                  <FavoriteToggle
                    :model-value="isMovieFavorite(movie.id)"
                    @update:modelValue="(value) => updateMovieFavorite(movie.id, value)"
                  />
                  <UButton
                    color="red"
                    variant="ghost"
                    icon="i-heroicons-trash"
                    :loading="deletingId === movie.id"
                    @click="handleDelete(movie.id)"
                  >
                    Remover
                  </UButton>
                </div>
              </template>
            </ItemCard>
          </li>
        </ul>
      </div>
    </UCard>

    <USlideover v-model="isCreateOpen" side="right">
      <div class="flex h-full flex-col">
        <header class="flex items-start justify-between border-b border-worship-200/70 p-6 dark:border-slate-800/60">
          <div>
            <h2 class="text-xl font-semibold text-slate-800 dark:text-slate-100">Adicionar filme</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">Compartilhe um título que mereça estar na sua coleção.</p>
          </div>
          <UButton color="worship" variant="ghost" icon="i-heroicons-x-mark" @click="closeCreate" />
        </header>

        <div class="flex-1 overflow-y-auto p-6">
          <UForm :state="createForm" class="space-y-5" @submit="handleCreate">
            <UFormGroup label="Título" name="title" required>
              <UInput v-model="createForm.title" placeholder="Ex: A Jornada da Esperança" size="lg" />
            </UFormGroup>

            <UFormGroup label="Descrição" name="description" required>
              <UTextarea
                v-model="createForm.description"
                placeholder="Uma breve descrição do impacto espiritual do filme"
                autoresize
                :maxrows="5"
              />
            </UFormGroup>

            <div class="flex justify-end gap-3">
              <UButton color="gray" variant="soft" @click.prevent="closeCreate">Cancelar</UButton>
              <UButton color="worship" type="submit" :loading="creating" icon="i-heroicons-check-circle">
                Salvar filme
              </UButton>
            </div>
          </UForm>
        </div>
      </div>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { computed, reactive, ref, watch } from 'vue'

interface MovieItem {
  id: number
  title: string
  description: string
}

interface CreateMovieForm {
  title: string
  description: string
}

const {
  data: movies,
  pending,
  refresh
} = await useFetch<MovieItem[]>('/api/movies', {
  default: () => []
})

const isRefreshing = computed(() => pending.value)
const isCreateOpen = ref(false)
const creating = ref(false)
const deletingId = ref<number | null>(null)

const createForm = reactive<CreateMovieForm>({
  title: '',
  description: ''
})

const favoriteMovies = ref<number[]>([])

const openCreate = () => {
  isCreateOpen.value = true
}

const closeCreate = () => {
  isCreateOpen.value = false
  createForm.title = ''
  createForm.description = ''
}

const refreshList = async () => {
  await refresh()
}

const handleCreate = async (event: FormSubmitEvent<CreateMovieForm>) => {
  if (creating.value) {
    return
  }

  creating.value = true

  try {
    await $fetch('/api/movies', {
      method: 'POST',
      body: event.data
    })
    await refresh()
    closeCreate()
  } catch (error) {
    console.error('Não foi possível criar o filme', error)
  } finally {
    creating.value = false
  }
}

const handleDelete = async (id: number) => {
  deletingId.value = id

  try {
    await $fetch(`/api/movies/${id}`, {
      method: 'DELETE'
    })
    await refresh()
  } catch (error) {
    console.error('Não foi possível remover o filme', error)
  } finally {
    deletingId.value = null
  }
}

const isMovieFavorite = (id: number) => favoriteMovies.value.includes(id)

const updateMovieFavorite = (id: number, value: boolean) => {
  if (value) {
    if (!favoriteMovies.value.includes(id)) {
      favoriteMovies.value = [...favoriteMovies.value, id]
    }
    return
  }

  favoriteMovies.value = favoriteMovies.value.filter((movieId) => movieId !== id)
}

watch(
  movies,
  (movieList) => {
    const ids = new Set((movieList ?? []).map((movie) => movie.id))
    favoriteMovies.value = favoriteMovies.value.filter((id) => ids.has(id))
  },
  { immediate: true }
)

definePageMeta({
  middleware: ['auth']
})
</script>
