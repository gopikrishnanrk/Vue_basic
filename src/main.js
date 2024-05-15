import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './routes/router';
import vue3GoogleLogin from 'vue3-google-login';

export const googleClientID =
  '303273391441-iurrmihtmn6f1v82861pii81l2feqdhv.apps.googleusercontent.com';
export const googleClientSecret = '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';

const app = createApp(App);
app.use(router);
app.use(vue3GoogleLogin, {
  clientId: googleClientID,
});
app.mount('#app');
