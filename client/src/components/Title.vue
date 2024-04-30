<template>
    <div class="title">
        <div class="text">
            
            <swiper 
                :navigation="true" 
                @swiper="onSwiper" 
                @slideChange="onSlideChange"
                @reachEnd="onReachEnd"
                @reachBeginning="onReachBeginning"
                @slidesUpdated="onSlidesUpdated"
                :modules="[Navigation]"
                :initialSlide="6"
                :runCallbacksOnInit="false"
            >
                <swiper-slide v-for="(date, index) in months" :key="index">
                    <h1 class="date">
                        {{ date.month }}
                    </h1>
                    <h3 class="date small">{{ date.year }}</h3>
                </swiper-slide>
            </swiper>  
            
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
    </div>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance, onBeforeMount } from "vue"
import { useStore } from 'vuex'
import axiosInstance from '../axios/axios';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import TypeSelector from "./TypeSelector.vue";

const app = getCurrentInstance();
const store = useStore()
const moment = app?.appContext.config.globalProperties.$moment;
const newDateObject = ref<monthObject>();
const prepend = ref<boolean>(false)

interface monthObject {
    date: string,
    month: string,
    year: string,
}

const currentDate = ref(new Date(`2024-01-01`));
const months = ref<Array<monthObject>>([]);
const selectType = ref('');

const initMonths = () => {    
    months.value = [];
    let startDate = moment(currentDate.value).add(-6, 'M');
    let i = 0;
    while (i < 13) {
        const newDate = moment(startDate).add(i, 'M');
        months.value.push({
            date: newDate.format('YYYY-MM-DD'),
            month: newDate.locale('en').format('MMMM'),
            year: newDate.format('YYYY')
        })
        i++;
    }
}

const onSlidesUpdated = (swiper, e) => {
    if (prepend.value) {
        console.log(swiper);
        
        swiper.process = 1;
        swiper.slideToLoop(1, 1000)
        prepend.value = false;
    }
}

onBeforeMount(() => {
    initMonths();
    console.log(months.value);
    
})

const onSlideChange = (swiper) => {
    // let newDate:string, change:number;
    // // 日期增加
    // if (swiper.touches.diff < 0 ) {
        
    // }
    // // 日期減少
    // else {
    //     newDate = months.value[0].date;
        
    //     newDateObject.value = {
    //         date: moment(newDate).add(-1, 'M').format('YYYY-MM-DD'),
    //         month: moment(newDate).add(-1, 'M').locale('en').format('MMMM'),
    //         year: moment(newDate).add(-1, 'M').format('YYYY')
    //     };
    //     months.value.unshift(newDateObject.value);
    // }

    // console.log(months.value);
    
}

const onReachEnd = (swiper) => {
    console.log('end');
    const newDate:string = months.value[swiper.slides.length - 1].date;
    newDateObject.value = {
        date: moment(newDate).add(1, 'M').format('YYYY-MM-DD'),
        month: moment(newDate).add(1, 'M').locale('en').format('MMMM'),
        year: moment(newDate).add(1, 'M').format('YYYY')
    };
    months.value.push(newDateObject.value);
}

const onReachBeginning = (swiper) => {
    // console.log(swiper);
    const newDate:string = months.value[0].date;
    newDateObject.value = {
        date: moment(newDate).add(-1, 'M').format('YYYY-MM-DD'),
        month: moment(newDate).add(-1, 'M').locale('en').format('MMMM'),
        year: moment(newDate).add(-1, 'M').format('YYYY')
    };
    months.value.unshift(newDateObject.value);
    prepend.value = true;
}

// swiper init
const onSwiper = (swiper) => {
    swiper.activeIndex = 6;
}

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
    // updateMonths()

}

changeDates();

</script>
<style scoped>

.text {
    color: #e3e3e3;
    width: 100%;
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
    width: 80%;
}

.text :deep(.dp__overlay_cell_active) {
    background-color: #8abae1;
}

.dp__theme_light {
    --dp-text-color: #e3e3e3;
    --dp-icon-color: #e3e3e3;
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
    color: #e3e3e3;
    margin: 0.25rem 0;
}

.type-select:focus-visible {
    outline: none;
}

.text :deep(.swiper-button-prev::after) {
    content: 'prev';
    color: #e3e3e3;
    font-size: 2rem;
}

.text :deep(.swiper-button-next::after) {
    content: 'next';
    color: #e3e3e3;
    font-size: 2rem;
}
</style>
