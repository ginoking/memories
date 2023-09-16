<template>
    <div class="darkgrey body-list">
        <ul>
            <li v-for="i in days" :class="checkEventClass(i)" @click="eventClickHandler(i)">
                {{ i.number }}
            </li>
        </ul>
    </div>
    <Transition>
        <EventModal 
        v-if="showEventModal" 
        @click="eventClickHandler" 
        @close-modal="showEventModal = false"
        :event="event"
        />
    </Transition>
    
</template>
<script setup lang="ts">
import { ref, watch } from "vue"
import { useStore } from 'vuex'
import EventModal from "./EventModal.vue"

const store = useStore();
const days = ref(store.state.days);
const showEventModal = ref(false)
const event = ref({});
// const title = ref('');
// const image = ref('');
// // const date = ref('');
// const des = ref('');

interface DateObject {
    event: {
        name: string,
        des: string,
        image: string
    }
}

function checkEventClass(date: DateObject) : string {
    return date.event ? 'event' : '';
}

function eventClickHandler(date: DateObject) : void 
{
    if (!date.event) return 
    event.value = date.event
    
    // title.value = event.name;
    // des.value = event.des;
    // image.value = event.image;
    // // date.value = date.date;

    showEventModal.value = true
}

watch(() => store.state.days, (newValue) => {
    days.value = newValue;
});
</script>
<style>
.body-list {
    display: flex;
    justify-content: center;
}
.body-list ul {
    padding-left: 0;
    width: 80%;
    font-family: 'Shantell Sans', cursive;
    font-weight: bold;
    font-size: 14px;
}
.body-list ul li {
    display: flex !important;
    justify-content: center;
    align-items: center;
    width: 14.28%;
    height: 8vh;
    line-height: 36px;
    font-size: 15px;
    list-style-type: none;
    display: block;
    box-sizing: border-box;
    float: left;
    text-align: center;
}
.event {
    color: #ff0008;
    border: 0;
    background-color: transparent;
    background-image: url('heart.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 70px;
    cursor: pointer;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
    .event {
        background-size: 60px;
    }
}
</style>