import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './routes/router';
import vue3GoogleLogin from 'vue3-google-login';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

export const googleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(vue3GoogleLogin, {
  clientId: googleClientID,
});
app.mount('#app');
