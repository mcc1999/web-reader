import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@/styles/index.scss';
import App from '@/App.vue';
import router from '@/router/index';
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
createApp(App).use(router).use(pinia).mount('#app');
