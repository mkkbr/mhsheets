import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MonsterView from '../views/MonsterView.vue';


const routes = [
  { path: '/', component: HomeView },
  { path: '/:monsterName', component: MonsterView },
  {
    path: '/:catchAll(.*)', // Catch-all route for 404
    redirect: '/', component: HomeView // Redirect to home
  },
];
const router = createRouter({
  history: createWebHistory('/mhsheets/'),
  routes,
});

export default router;
