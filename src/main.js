import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';  
import '@fortawesome/fontawesome-free/css/all.css';
import '@fontsource/fira-sans-condensed';

const app = createApp(App);
app.use(router);
app.mount('#app');
