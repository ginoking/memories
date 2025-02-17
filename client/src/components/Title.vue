<template>
    <div class="title">
        <div class="text">
            
            <swiper-vue 
                :navigation="true" 
                @swiper="onSwiper" 
                @slideChange="onSlideChange"
                @reachEnd="onReachEnd"
                @reachBeginning="onReachBeginning"
                :modules="[Navigation]"
                :initialSlide="6"
                :runCallbacksOnInit="false"
                :loopPreventsSliding="true"
            >
                <swiper-slide v-for="(date, index) in months" :key="index">
                    <h1 class="date">
                        {{ date.month }}
                    </h1>
                    <h3 class="date small">{{ date.year }}</h3>
                </swiper-slide>
            </swiper-vue>  
            
            <div class="filter">
                <VueDatePicker auto-apply month-picker v-model="currentDate" :enable-time-picker="false"
                    :format="() => moment(currentDate).format('YYYY-MM')" :clearable="false"
                    @update:model-value="changeDates">
                    <template #action-buttons></template>
                    <template #action-preview></template>
                </VueDatePicker>
                <el-select v-model="selectType" placeholder="All" style="width: 100%" @change="getTypeFromSelect">
                    <el-option v-for="item in emojis" :key="item.key" :label="item.text" :value="item.key" />
                </el-select>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance, onBeforeMount } from "vue"
import { useStore } from 'vuex'
import axiosInstance from '../axios/axios';
import { Swiper as SwiperVue, SwiperSlide } from 'swiper/vue';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import emojis from "../helpers/emojis"

const app = getCurrentInstance();
const store = useStore()
const moment = app?.appContext.config.globalProperties.$moment;
const newDateObject = ref<monthObject>();

interface monthObject {
    date: string,
    month: string,
    year: string,
}

const months = ref<Array<monthObject>>([]);
const currentDate = ref(moment().format('YYYY-MM-01'));
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

onBeforeMount(() => {
    initMonths();
})

const onSlideChange = (swiper: Swiper) => {
    
    if (swiper.activeIndex == 0 && swiper.previousIndex == 1) {
        swiper.slideTo(1, 0);
        return;
    }

    currentDate.value = new Date(months.value[swiper.activeIndex].date);

    getData(moment(currentDate.value).format("YYYY-MM"));
    
}

const onReachEnd = (swiper: Swiper) => {
    const newDate:string = months.value[swiper.slides.length - 1].date;
    newDateObject.value = {
        date: moment(newDate).add(1, 'M').format('YYYY-MM-DD'),
        month: moment(newDate).add(1, 'M').locale('en').format('MMMM'),
        year: moment(newDate).add(1, 'M').format('YYYY')
    };
    months.value.push(newDateObject.value);
}

const onReachBeginning = (swiper: Swiper) => {
    
    const newDate:string = months.value[0].date;
    newDateObject.value = {
        date: moment(newDate).add(-1, 'M').format('YYYY-MM-DD'),
        month: moment(newDate).add(-1, 'M').locale('en').format('MMMM'),
        year: moment(newDate).add(-1, 'M').format('YYYY')
    };
    months.value = [
        newDateObject.value,
        ...months.value
    ]
}

// swiper init
const onSwiper = (swiper: Swiper) => {
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

    getData(newMoment.format("YYYY-MM"));

}

const getData = async (date:string) => {
    const { data } = await axiosInstance.post('/', { time: date, type: selectType.value });

    store.commit('setDays', data)
}

changeDates();

</script>
<style scoped>
.date {
    color: #fff;
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

:deep(.el-select__caret) {
    color: #fff;
    font-weight: 900;
}

:deep(.el-select__wrapper) {
    background: #8abae1;
    box-shadow: none;
}

:deep(.el-select__placeholder.is-transparent) {
    color: #fff;
}

:deep(.el-select__placeholder) {
    color: #fff;
    letter-spacing: 2px;
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
