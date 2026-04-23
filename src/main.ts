import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { getStorageImageUrl } from './services/storage'

const app = createApp(App)

app.use(router)
app.mount('#app')

async function setDynamicFavicon() {
  try {
    const faviconUrl = await getStorageImageUrl('co-creation-logo-black.png')

    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null

    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }

    link.type = 'image/png'
    link.href = `${faviconUrl}?v=${Date.now()}`
  } catch (error) {
    console.error('Failed to load favicon from Firebase Storage:', error)
  }
}

setDynamicFavicon()