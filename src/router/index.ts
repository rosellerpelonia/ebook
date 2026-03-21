import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/modules',
    name: 'modules',
    component: () => import('@/pages/ModulesPage.vue'),
  },
  {
    path: '/reflection',
    name: 'reflection',
    component: () => import('@/pages/ReflectionPage.vue'),
  },
  {
    path: '/credits',
    name: 'credits',
    component: () => import('@/pages/CreditsPage.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})