<template>
    <div class="title">
        <a @click.prevent="changeDates(false)">{{ '<' }}</a>
        <div class="text">
            <h1 for="test" class="date" id="calendar-title">{{ moment(currentDate).locale('en').format('MMMM') }}</h1>
            <h3 class="date small" id="calendar-year">{{ moment(currentDate).format('YYYY') }}</h3>
            <VueDatePicker 
                auto-apply 
                month-picker 
                v-model="currentDate" 
                :enable-time-picker="false" :format="() => moment(currentDate).format('YYYY/MM')"
                :clearable="false"
                @update:model-value="changeDates"
            >
                <template #action-buttons></template>
                <template #action-preview></template>
            </VueDatePicker>
        </div>
        <a @click.prevent="changeDates(true)">{{ '>' }}</a>
    </div>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance } from "vue"
import { useStore } from 'vuex'
import {useLoading} from 'vue-loading-overlay'
import axiosInstance from '../axios/axios';

const app = getCurrentInstance();
const store = useStore()
const moment = app?.appContext.config.globalProperties.$moment ;

const currentDate = ref(`2024-01-01`);

const $loading = useLoading({
    // options
});

const changeDates = async (next:boolean) => {
    const loader = $loading.show({
        // Optional parameters
    });
	
    const newMoment = next ? 
		moment(currentDate.value).add(1, "M") : 
		moment(currentDate.value).subtract(1, "M");
    currentDate.value = newMoment.format('YYYY-MM-DD').toString();

	const { data } = await axiosInstance.post('/', {time: newMoment.format("YYYY-MM")})

    store.commit('setDays', data)    

    setTimeout(() => {
        loader.hide()
    }, 1000)
}

changeDates(true);

</script>
<style scoped>

    .date {
        color: #e3e3e3;
    }
    .title a {
        cursor: pointer;
        font-size: 25px;
    }

    .text >>> .dp__overlay_cell {
        color: #53656d;
    }

    .text >>> .dp--year-select
    {
        color: #53656d;
    }

    .text >>> .dp__input_wrap {
        margin: 0 auto;
        width: 55%;
    }

    .text >>> .dp__overlay_cell_active {
        background-color: #8abae1;
    }

    .dp__theme_light {
        --dp-text-color: white;
        --dp-icon-color: white;
        --dp-background-color: transparent;
        --dp-border-color: transparent;
    }

    
</style>
