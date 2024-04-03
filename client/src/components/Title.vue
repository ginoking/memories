<template>
    <div class="title">
        <a @click.prevent="changeDates(-1)">{{ '<' }}</a>
        <div class="text">
            <h1 for="test" class="date" id="calendar-title">{{ moment(currentDate).locale('en').format('MMMM') }}</h1>
            <h3 class="date small" id="calendar-year">{{ moment(currentDate).format('YYYY') }}</h3>
            <VueDatePicker 
                auto-apply 
                month-picker 
                v-model="currentDate" 
                :enable-time-picker="false" :format="() => moment(currentDate).format('YYYY-MM')"
                :clearable="false"
                @update:model-value="changeDates"
            >
                <template #action-buttons></template>
                <template #action-preview></template>
            </VueDatePicker>
        </div>
        <a @click.prevent="changeDates(1)">{{ '>' }}</a>
    </div>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance } from "vue"
import { useStore } from 'vuex'
import axiosInstance from '../axios/axios';

const app = getCurrentInstance();
const store = useStore()
const moment = app?.appContext.config.globalProperties.$moment ;

const currentDate = ref(new Date(`2024-01-01`));


const changeDates = async (change?:number) => { 
    
    const newMoment = moment(currentDate.value);
    if (typeof change === 'number') {
        newMoment.add(change, 'M');
    }
        
    currentDate.value = newMoment.format('YYYY-MM-DD').toString();

	const { data } = await axiosInstance.post('/', {time: newMoment.format("YYYY-MM")})

    store.commit('setDays', data)    

}

changeDates();

</script>
<style scoped>

    .date {
        color: #e3e3e3;
    }
    .title a {
        cursor: pointer;
        font-size: 25px;
    }

    .text :deep(.dp__overlay_cell) {
        color: #53656d;
    }

    .text :deep(.dp--year-select)
    {
        color: #53656d;
    }

    .text :deep(.dp__input_wrap) {
        margin: 0 auto;
        width: 55%;
    }

    .text :deep(.dp__overlay_cell_active) {
        background-color: #8abae1;
    }

    .dp__theme_light {
        --dp-text-color: white;
        --dp-icon-color: white;
        --dp-background-color: transparent;
        --dp-border-color: transparent;
    }

    
</style>
