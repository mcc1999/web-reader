import { createRouter, createWebHashHistory } from 'vue-router';
import Bookshelf from '@/views/bookshelf/index.vue';
import Reader from '@/views/reader/index.vue';

const routes = [
  { path: '/', redirect: '/bookshelf' },
  { path: '/bookshelf', component: Bookshelf },
  { path: '/reader', component: Reader },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
