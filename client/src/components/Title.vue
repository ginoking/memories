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
import axiosInstance from '../axios/axios';

const store = useStore()
let currentDate = ref(`2021-12-01`);
let yearTitle = ref(formatDate('YYYY'));
let monthTitle = ref(formatDate('MMMM'));

changeDates(true);

async function changeDates(next: boolean): Promise<void> { 
	
    const newMoment = next ? 
		moment(currentDate.value).add(1, "M") : 
		moment(currentDate.value).subtract(1, "M");
    currentDate.value = newMoment.format('YYYY-MM-DD').toString();
    yearTitle.value = formatDate('YYYY');
    monthTitle.value = formatDate('MMMM');

	const { data } = await axiosInstance.post('/', {time: newMoment.format("YYYY-MM")})

    store.commit('setDays', data)    
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
