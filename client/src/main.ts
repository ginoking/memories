import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createStore } from 'vuex'


import App from './App.vue'
import router from './router'

const store = createStore({
    state() {
        return {
            days: [],
            year: '2021',
            month: '12',
            showCreateBtn: true 
        }
    },
    mutations: {
        setDays(state, days) {
            state.days = days
        },
        setShowCreateBtn(state, status) {
            state.showCreateBtn = status
        }
        // setEditModelState(state) {
        //     state.editModelState = !state.editModelState
        // }
    }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)

// app.mixin(axiosInstance)

app.mount('#app')
