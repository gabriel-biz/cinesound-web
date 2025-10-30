// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~~/app/assets/css/main.css'],
  ui: {
    global: true,
    icons: ['heroicons', 'lucide']
  },
  app: {
    head: {
      titleTemplate: (titleChunk?: string) =>
        titleChunk ? `${titleChunk} · CineSound` : 'CineSound · Refúgio Devocional',
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600&display=swap'
        }
      ],
      meta: [
        {
          name: 'theme-color',
          content: '#f8f4ee'
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in', appear: true },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  }
})
