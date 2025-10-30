<template>
  <div class="min-h-screen bg-gradient-to-b from-worship-50 via-white/80 to-lilac-50 text-slate-800 dark:from-slate-950 dark:via-slate-950/90 dark:to-slate-950">
    <NuxtLoadingIndicator color="#bda583" :height="3" />

    <div class="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(189,165,131,0.18),transparent_60%)]" />

    <AppHeader @logout="handleLogout" />

    <main class="relative px-4 pb-12 pt-6">
      <UContainer>
        <slot />
      </UContainer>
    </main>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()

const handleLogout = () => {
  auth.logout()
  navigateTo('/login')
}
</script>
