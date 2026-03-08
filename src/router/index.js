import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MonsterView from '../views/MonsterView.vue';


const routes = [
  { path: '/', component: HomeView },
  { path: '/:monsterName', component: MonsterView },
];
const router = createRouter({
  history: createWebHistory('/mhsheets/'),
  routes,
});

export default router;
