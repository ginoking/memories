import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createStore } from 'vuex'
import moment from 'moment'
import 'moment/dist/locale/zh-tw';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import App from './App.vue'
import router from './router'
import axios from 'axios'

moment.locale('zh-tw');

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

app.config.globalProperties.$moment=moment;
app.config.globalProperties.$axios=axios;

app.use(createPinia())
app.use(router)
app.use(store)

// app.mixin(axiosInstance)

app.component('VueDatePicker', VueDatePicker).mount('#app')
