import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createStore } from 'vuex'
import moment from 'moment'
import 'moment/dist/locale/zh-tw';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import Swal, { type SweetAlertOptions } from 'sweetalert2'

// import { startAuthentication } from '@simplewebauthn/browser';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

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

const swalOptions = <SweetAlertOptions>{
    icon: 'success',
    width: '50%',
    confirmButtonColor: "#4d90d8",
};
const app = createApp(App)

app.config.globalProperties.$moment=moment;
app.config.globalProperties.$axios=axios;

app.use(createPinia())
app.use(router)
app.use(store)
app.use(ElementPlus)
app.provide('$swal', Swal.mixin(swalOptions));

app.component('VueDatePicker', VueDatePicker).mount('#app')

if (window.PublicKeyCredential &&
	PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable &&
	PublicKeyCredential.isConditionalMediationAvailable) {
	// Check if user verifying platform authenticator is available.  
	Promise.all([
		PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
		PublicKeyCredential.isConditionalMediationAvailable(),
	]).then(results => {
		if (results.every(r => r === true)) {
			localStorage.setItem('canPasskey', 'true');
		}
	});
}
