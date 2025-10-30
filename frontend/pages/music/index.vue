<template>
  <div class="space-y-8">
    <header class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="space-y-1">
        <p class="text-sm font-medium uppercase tracking-[0.3em] text-worship-500">Coleção</p>
        <h1 class="text-3xl font-semibold text-slate-800 dark:text-slate-100">Músicas</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Registre canções que conduzem sua devoção e inspiram momentos de paz.
        </p>
      </div>
      <UButton color="worship" icon="i-heroicons-plus" @click="openCreate">
        Nova música
      </UButton>
    </header>

    <UCard class="bg-white/70 dark:bg-slate-950/60">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100">Lista de músicas</h2>
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
          v-if="!songs?.length"
          class="rounded-2xl border border-dashed border-worship-200/70 bg-worship-50/40 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400"
        >
          Nenhuma música registrada ainda. Compartilhe os louvores que te tocam.
        </div>

        <ul v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <li v-for="song in songs" :key="song.id" class="h-full">
            <UCard class="flex h-full flex-col justify-between bg-white/80 dark:bg-slate-900/70">
              <div class="space-y-2">
                <p class="text-sm font-medium uppercase tracking-[0.25em] text-lilac-500">Música</p>
                <h3 class="text-xl font-semibold text-slate-800 dark:text-slate-100">{{ song.title }}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ song.artist }}</p>
              </div>
              <div class="mt-6 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span class="flex items-center gap-2">
                  <UIcon name="i-heroicons-musical-note" class="text-lilac-500" />
                  Reverente
                </span>
                <UButton
                  color="red"
                  variant="ghost"
                  icon="i-heroicons-trash"
                  :loading="deletingId === song.id"
                  @click="handleDelete(song.id)"
                >
                  Remover
                </UButton>
              </div>
            </UCard>
          </li>
        </ul>
      </div>
    </UCard>

    <USlideover v-model="isCreateOpen" side="right">
      <div class="flex h-full flex-col">
        <header class="flex items-start justify-between border-b border-worship-200/70 p-6 dark:border-slate-800/60">
          <div>
            <h2 class="text-xl font-semibold text-slate-800 dark:text-slate-100">Adicionar música</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">Traga a melodia que preenche seu coração.</p>
          </div>
          <UButton color="worship" variant="ghost" icon="i-heroicons-x-mark" @click="closeCreate" />
        </header>

        <div class="flex-1 overflow-y-auto p-6">
          <UForm :state="createForm" class="space-y-5" @submit="handleCreate">
            <UFormGroup label="Título" name="title" required>
              <UInput v-model="createForm.title" placeholder="Ex: Brisa da Manhã" size="lg" />
            </UFormGroup>

            <UFormGroup label="Artista" name="artist" required>
              <UInput v-model="createForm.artist" placeholder="Artista ou ministério" size="lg" />
            </UFormGroup>

            <div class="flex justify-end gap-3">
              <UButton color="gray" variant="soft" @click.prevent="closeCreate">Cancelar</UButton>
              <UButton color="worship" type="submit" :loading="creating" icon="i-heroicons-check-circle">
                Salvar música
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
import { computed, reactive, ref } from 'vue'

interface SongItem {
  id: number
  title: string
  artist: string
}

interface CreateSongForm {
  title: string
  artist: string
}

const {
  data: songs,
  pending,
  refresh
} = await useFetch<SongItem[]>('/api/music', {
  default: () => []
})

const isRefreshing = computed(() => pending.value)
const isCreateOpen = ref(false)
const creating = ref(false)
const deletingId = ref<number | null>(null)

const createForm = reactive<CreateSongForm>({
  title: '',
  artist: ''
})

const openCreate = () => {
  isCreateOpen.value = true
}

const closeCreate = () => {
  isCreateOpen.value = false
  createForm.title = ''
  createForm.artist = ''
}

const refreshList = async () => {
  await refresh()
}

const handleCreate = async (event: FormSubmitEvent<CreateSongForm>) => {
  if (creating.value) {
    return
  }

  creating.value = true

  try {
    await $fetch('/api/music', {
      method: 'POST',
      body: event.data
    })
    await refresh()
    closeCreate()
  } catch (error) {
    console.error('Não foi possível criar a música', error)
  } finally {
    creating.value = false
  }
}

const handleDelete = async (id: number) => {
  deletingId.value = id

  try {
    await $fetch(`/api/music/${id}`, {
      method: 'DELETE'
    })
    await refresh()
  } catch (error) {
    console.error('Não foi possível remover a música', error)
  } finally {
    deletingId.value = null
  }
}

definePageMeta({
  middleware: ['auth']
})
</script>
