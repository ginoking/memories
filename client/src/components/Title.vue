<template>
    <div class="title">
        <a @click.prevent="changeDates(false)">{{ '<' }}</a>
        <div class="text">
            <h1 class="green" id="calendar-title">{{ monthTitle }}</h1>
            <h3 class="green small" id="calendar-year">{{ yearTitle }}</h3>
        </div>
        <a @click.prevent="changeDates(true)">{{ '>' }}</a>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useStore } from 'vuex'
import moment from 'moment'
import {useLoading} from 'vue-loading-overlay'
import axiosInstance from '../axios/axios';
import vueDebounce, { PluginConfig, debounce } from 'vue-debounce'

const store = useStore()
let currentDate = ref(`2024-01-01`);
let yearTitle = ref(formatDate('YYYY'));
let monthTitle = ref(formatDate('MMMM'));

const $loading = useLoading({
    // options
});

changeDates(true);

async function changeDates(next: boolean): Promise<void> { 

    const loader = $loading.show({
        // Optional parameters
    });
	
    const newMoment = next ? 
		moment(currentDate.value).add(1, "M") : 
		moment(currentDate.value).subtract(1, "M");
    currentDate.value = newMoment.format('YYYY-MM-DD').toString();
    yearTitle.value = formatDate('YYYY');
    monthTitle.value = formatDate('MMMM');

	const { data } = await axiosInstance.post('/', {time: newMoment.format("YYYY-MM")})

    store.commit('setDays', data)    

    setTimeout(() => {
        loader.hide()
    }, 1000)
}

function formatDate(format: string) : string {
    return moment(currentDate.value).format(format) 
}
</script>
<style scoped>
    .title a {
        cursor: pointer;
        font-size: 25px;
    }
</style>
