import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('../views/index.vue') },
  {
    path: '/board',
    component: () => import('../views/board.vue'),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
