import axios, { type AxiosInstance } from 'axios';
import router from "../router"
import { useLoading, type ActiveLoader } from 'vue-loading-overlay'

const $loading = useLoading({
	// options
});
let loader:ActiveLoader;

const instance: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? (window.location.origin + "/api"),
	headers: {
		'Content-Type': 'application/json',
	},
});

instance.interceptors.request.use((config) => {
	
	if (config.url != 'login') {
		loader = $loading.show();
	}
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = "Bearer " + token;
	}
	return config;
}, (error) => {
	loader.hide();
})

instance.interceptors.response.use((response) => {
	setTimeout(() => {
        loader.hide()
    }, 500)
	return response
}, (error) => {
	loader.hide();
	if (error.response.status == 401) {
		localStorage.removeItem('token');
		router.push('login');
	}
	return Promise.reject(error)
})

export default instance;