<template>
  <UCard class="flex h-full flex-col justify-between bg-white/80 dark:bg-slate-900/70">
    <div class="space-y-2">
      <p
        class="text-sm font-medium uppercase tracking-[0.25em]"
        :class="accent === 'lilac' ? 'text-lilac-500' : 'text-worship-500'"
      >
        {{ label }}
      </p>
      <h3 class="text-xl font-semibold text-slate-800 dark:text-slate-100">{{ title }}</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400">{{ description }}</p>
    </div>

    <div class="mt-6 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
      <slot name="meta">
        <span v-if="icon" class="flex items-center gap-2">
          <UIcon :name="icon" :class="accent === 'lilac' ? 'text-lilac-500' : 'text-worship-500'" />
          {{ metaLabel }}
        </span>
      </slot>
      <slot name="actions" />
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface Props {
  label: string
  title: string
  description: string
  icon?: string
  metaLabel?: string
  accent?: 'worship' | 'lilac'
}

withDefaults(defineProps<Props>(), {
  icon: undefined,
  metaLabel: 'Inspirador',
  accent: 'worship'
})
</script>
