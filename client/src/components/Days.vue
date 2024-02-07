<template>
    <div class="darkgrey body-list">
        <ul>
            <li v-for="i in days" :class="checkEventClass(i)" @click="dateClickHandler(i)">
                {{ i.number }}
            </li>
        </ul>
    </div>
    <Transition>
        <EventModal v-if="showEventModal" @close-modal="showEventModal = false" :event="event" />
    </Transition>
    <div ref="listContent">
        <div class="model-content">
            <p class="event-item" v-for="item in events" @click="eventClickHandler(item)">
                <span v-html="eventTypes[item.type]"></span>
                {{ item.name }} 
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue"
import { useStore } from 'vuex'
import Swal, { SweetAlertOptions } from 'sweetalert2'
import EventModal from "./EventModal.vue"

const store = useStore();

const listContent = ref<HTMLDivElement>();
const days = ref(store.state.days);
const showEventModal = ref(false)
const events = ref();
const event = ref();
const eventTypes = ref({
    happy: "&#128518;",
    love: "&#128525;",
    sad: "&#128546;",
    angry: "&#128545;"
})

interface EventObject {
    name: string,
    des: string,
    image: string,
    date: string
}

interface DateEvents {
    date: string, 
    event: EventObject[],
    number: string
}

function checkEventClass(date: DateEvents) : string {
    return date.event?.length > 0 ? 'event' : '';
}

function dateClickHandler(date: DateEvents)
{    
    if (!date.event) return
    if (date.event.length > 1) {
        events.value = date.event
        const swalOptions = <SweetAlertOptions>{
            html: listContent.value,
            showConfirmButton: false,
            width: '90%',
        };
        Swal.fire(swalOptions).then((result) => {            
            if (!result.dismiss) {
                showEventModal.value = true;
            }
        });
    }
    else {
        event.value = date.event[0];
        showEventModal.value = true;
        store.commit('setShowCreateBtn', false);
    }

}

function eventClickHandler(date: EventObject): void {
    store.commit('setShowCreateBtn', false);
    event.value = date
    Swal.close();
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
    /* font-size: 15px; */
    list-style-type: none;
    display: block;
    box-sizing: border-box;
    float: left;
    text-align: center;
}

.event {
    color: #e77569;
    font-size: 20px;
    font-weight: bold;
    border: 0;
    background-color: transparent;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 70px;
    cursor: pointer;
}

.event-item {
    display: flex;
    justify-content: start;
    margin: 1rem 0;
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
        background-size: 50px;
    }
}
</style>