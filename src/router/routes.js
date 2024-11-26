import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/LandingPage.vue';
import Plane from '../components/plane.vue';
import Pathfinding from '../components/pathfinding.vue';
import ThreeD_Terrain_Generation from '../components/3d_terrain_generation.vue';
import ThreeD_Game from '../components/3d-game.vue';
import Expenses from '../components/expenses.vue';
const routes = [
  { path: '/', component: LandingPage },
  { path: '/plane', component: Plane },
  { path: '/pathfinding', component: Pathfinding },
  { path: '/3d-terrain', component: ThreeD_Terrain_Generation },
  { path: '/3d-game', component: ThreeD_Game },
  { path: '/expenses', component: Expenses }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;