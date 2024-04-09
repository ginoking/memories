import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Reset from '../views/Reset.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
			meta: { requiresAuth: true },
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: { requiresAuth: false },
		},
		{
			path: '/signup',
			name: 'signup',
			component: Signup,
			meta: { requiresAuth: false },
		},
		{
			path: '/reset',
			name: 'reset',
			component: Reset,
			meta: { requiresAuth: false },
		}
	]
})

router.beforeEach((to, from, next) => {
	const token = localStorage.getItem("token");
	if (token) {
		if (to.name == 'login' || to.name == 'signup') {
			next({ name: 'home'});
		}
	}
	else {
		if (to.meta.requiresAuth) {
			next({ name: 'login'});
		}
		
	}
	next()
})

export default router
