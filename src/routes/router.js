// router.js
import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import SignUp from '../components/SignUp/SignUp.vue';
import Dashboard from '../components/Dashboard/Dashboard.vue';
import LoginManagement from '../components/Login/LoginManagement.vue';
import InvalidPage from '../common/InvalidPage.vue';
import TextList from '../components/TextManagement/TextList.vue';
import { getUserDetails } from '../utils/localStorage';

// import { getUserDetails } from '../utils/localStorage';

const routes = [
  {
    path: '/signup',
    component: SignUp,
    public: true,
  },
  {
    path: '/login',
    component: SignUp,
    public: true,
  },
  { path: '/', component: LoginManagement, public: true },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/text-management',
    component: TextList,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: InvalidPage,
  },
];

// const isLoggedIn =
//   getUserDetails() ?? 'sad'
//     ? routes
//     : routes.filter((each) => each.path !== '/dashboard');

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  const isLoggedIn = getUserDetails();
  const privateRoute = routes
    ?.filter((each) => !each.public)
    ?.map(({ path }) => path);
  const publicRoute = routes
    ?.filter((each) => each.public)
    ?.map(({ path }) => path);

  if (isLoggedIn) return !publicRoute?.includes(to.path);

  if (!isLoggedIn) return !privateRoute?.includes(to.path);
});

export default router;
