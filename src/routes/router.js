// router.js
import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import SignUp from '../components/SignUp/SignUp.vue';
import Dashboard from '../components/Dashboard/Dashboard.vue';
import LoginManagement from '../components/Login/LoginManagement.vue';
// import { getUserDetails } from '../utils/localStorage';

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

// const isLoggedIn =
//   getUserDetails() ?? 'sad'
//     ? routes
//     : routes.filter((each) => each.path !== '/dashboard');

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
