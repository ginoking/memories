<template>
    <div class="title">
        <a @click.prevent="changeDates(-1)">{{ '<' }}</a>
        <div class="text">
            <h1 for="test" class="date" id="calendar-title">{{ moment(currentDate).locale('en').format('MMMM')
                }}</h1>
            <h3 class="date small" id="calendar-year">{{ moment(currentDate).format('YYYY') }}</h3>
            <div class="filter">
                <VueDatePicker auto-apply month-picker v-model="currentDate" :enable-time-picker="false"
                    :format="() => moment(currentDate).format('YYYY-MM')" :clearable="false"
                    @update:model-value="changeDates">
                    <template #action-buttons></template>
                    <template #action-preview></template>
                </VueDatePicker>
                <TypeSelector default-text="All" @sendType="getTypeFromSelect" />
            </div>

        </div>
        <a @click.prevent="changeDates(1)">{{ '>' }}</a>
    </div>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance } from "vue"
import { useStore } from 'vuex'
import axiosInstance from '../axios/axios';
import TypeSelector from "./TypeSelector.vue";

const app = getCurrentInstance();
const store = useStore()
const moment = app?.appContext.config.globalProperties.$moment;

const currentDate = ref(moment().format('YYYY-MM-01'));
const selectType = ref('');

const getTypeFromSelect = (data:string) => {
    selectType.value = data
    changeDates();
}

const changeDates = async (change?: number) => {

    const newMoment = moment(currentDate.value);
    if (typeof change === 'number') {
        newMoment.add(change, 'M');
    }

    currentDate.value = newMoment.format('YYYY-MM-DD').toString();

    const { data } = await axiosInstance.post('/', { time: newMoment.format("YYYY-MM"), type: selectType.value });

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

.text :deep(.dp--year-select) {
    color: #53656d;
}

.text :deep(.dp__input_wrap) {
    margin: 0 auto;
    width: 65%;
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

.filter {
    display: flex;
    align-items: center;
}

.type-select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 7px 40px 7px 12px;
    width: 70%;
    border: 0;
    background: #8abae1;
    cursor: pointer;
    font-family: inherit;
    font-size: 16px;
    transition: all 150ms ease;
    color: #fff;
    margin: 0.25rem 0;
}

.type-select:focus-visible {
    outline: none;
}
</style>
