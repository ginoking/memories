import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createStore } from 'vuex'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue'
import router from './router'

const store = createStore({
    state() {
        return {
            days: [],
            year: '2021',
            month: '12'
        }
    },
    mutations: {
        setDays(state, days) {
            state.days = days
        }
    }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)
app.use(VueSweetalert2)
// app.mixin(axiosInstance)

app.mount('#app')
