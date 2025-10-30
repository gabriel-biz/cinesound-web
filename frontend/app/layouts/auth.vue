<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-worship-50 via-white/85 to-lilac-50 py-16 dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-950">
    <NuxtLoadingIndicator color="#bda583" :height="3" />

    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(161,141,198,0.18),transparent_55%)]" />

    <div class="relative z-10 w-full max-w-md px-4">
      <div class="mb-8 text-center">
        <NuxtLink to="/" class="text-2xl font-semibold tracking-wide text-slate-700 transition hover:text-worship-600 dark:text-slate-100 dark:hover:text-worship-400">
          CineSound
        </NuxtLink>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Um espaço sereno para celebrar filmes e músicas inspiradoras.
        </p>
      </div>

      <UCard class="bg-white/85 shadow-xl backdrop-blur dark:bg-slate-950/80">
        <slot />
      </UCard>
    </div>
  </div>
</template>
