import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MonsterView from '../views/MonsterView.vue';


const routes = [
  { path: '/', component: HomeView },
  { 
    path: '/:monsterName', 
    component: MonsterView,
    beforeEnter: async (to, from, next) => {
      try {
        const response = await fetch('./data/wilds_monsters.json');
        const monsters = await response.json();
        const monsterName = to.params.monsterName;
        
        if (monsters.some(m => m.defname === monsterName)) {
          next();
        } else {
          next('/'); 
        }
      } catch (error) {
        console.error('Error fetching monster names:', error);
        next('/');
      }
    }
  },
  {
    path: '/:catchAll(.*)', // Catch-all route for 404
    redirect: '/', // Redirect to home
  },
];
const router = createRouter({
  history: createWebHistory('/mhsheets/'),
  routes,
});

export default router;
