import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        courses: resolve(__dirname, 'courses.html'),
        attachments: resolve(__dirname, 'attachments.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        testimonials: resolve(__dirname, 'testimonials.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        team: resolve(__dirname, 'team.html'),
        blog: resolve(__dirname, 'blog.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
