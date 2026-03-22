import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import ExplorePage from '@/pages/ExplorePage.vue';
import AboutUsPage from '@/pages/AboutUsPage.vue';
import CreditsPage from '@/pages/CreditsPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/explore', name: 'explore', component: ExplorePage },
    { path: '/about-us', name: 'about-us', component: AboutUsPage },
    { path: '/credits', name: 'credits', component: CreditsPage },
  ],
});

export default router;