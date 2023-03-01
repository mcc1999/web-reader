import { createRouter, createWebHashHistory } from 'vue-router';
import Bookshelf from '@/views/bookshelf/index.vue';
import Reader from '@/views/reader/index.vue';
import Test from '@/views/test-page.vue';

const routes = [
  { path: '/', redirect: '/bookshelf' },
  { path: '/bookshelf', component: Bookshelf },
  { path: '/reader', component: Reader },
  { path: '/test-page', component: Test },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
