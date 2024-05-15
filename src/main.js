import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './routes/router';
import vue3GoogleLogin from 'vue3-google-login';

export const googleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const app = createApp(App);
app.use(router);
app.use(vue3GoogleLogin, {
  clientId: googleClientID,
});
app.mount('#app');
