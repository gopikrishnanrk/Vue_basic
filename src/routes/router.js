// router.js
import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import SignUp from '../components/SignUp/SignUp.vue';
import Dashboard from '../components/Dashboard/Dashboard.vue';
import LoginManagement from '../components/Login/LoginManagement.vue';

const routes = [
  {
    path: '/signup',
    component: SignUp,
  },
  {
    path: '/login',
    component: SignUp,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  { path: '/', component: LoginManagement },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
