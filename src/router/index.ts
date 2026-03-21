import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import ModulesPage from '@/pages/ModulesPage.vue';
import ReflectionPage from '@/pages/ReflectionPage.vue';
import CreditsPage from '@/pages/CreditsPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/explore', name: 'explore', component: ModulesPage },
    { path: '/about-us', name: 'about-us', component: ReflectionPage },
    { path: '/credits', name: 'credits', component: CreditsPage },
  ],
});

export default router;