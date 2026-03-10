import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MonsterView from "../views/MonsterView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/:monsterName", component: MonsterView },
  {
    path: "/:catchAll(.*)", // Catch-all route for 404
    redirect: "/", // Redirect to home
  },
];
const router = createRouter({
  history: createWebHashHistory("/mhsheets/"),
  routes,
});

export default router;
