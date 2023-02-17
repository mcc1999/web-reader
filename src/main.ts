import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@/styles/index.scss';
import App from '@/App.vue';
import router from '@/router/index';
import 'element-plus/es/components/message/style/css'

createApp(App).use(router).use(createPinia()).mount('#app');
