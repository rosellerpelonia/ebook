import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import ExplorePage from "@/pages/ExplorePage.vue";
import ReflectionPage from "@/pages/ReflectionPage.vue";
import CreditsPage from "@/pages/CreditsPage.vue";
import QuizPage from "@/pages/QuizPage.vue";
import AddQuiz from "@/pages/AddQuiz.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomePage },
    { path: "/explore", name: "explore", component: ExplorePage },
    { path: "/reflection", name: "reflection", component: ReflectionPage },
    { path: "/credits", name: "credits", component: CreditsPage },
    { path: "/quiz", name: "quiz", component: QuizPage },
    { path: "/add-quiz", name: "add-quiz", component: AddQuiz },
  ],
});

export default router;
