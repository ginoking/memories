<template>
    <div class="modal-overlay" @click.self="close">
        <div class="modal">
            <div class="modal-header">
                <div class="close" @click="close">
                    <img class="close-img" src="../assets/close-icon.svg" alt="" />
                </div>
            </div>
            <div class="modal-content">
                <h6 class="name">{{ event.name }}</h6>
                <p class="date">{{ moment(event.date).format('YYYY/MM/DD') }}</p>
                <img :src="`${serverUrl}/${event.image}`" alt="">
                <p class="des">{{ event.des }}</p>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import moment from 'moment';
import axiosInstance from '../axios/axios';
interface EventObject {
    name: string,
    des: string,
    image: string,
    date: string
}
const props = defineProps<{
    event: EventObject
}>()
const emit = defineEmits(['close-modal'])
const close = () => {
    emit('close-modal', false)
}
const serverUrl = axiosInstance.defaults.baseURL;
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #000000da;
}

.modal {
    position: relative;
    text-align: center;
    background-color: #78aede;
    color: #fff;
    max-height: 85vh;
    width: 80%;
    margin-top: 1.5rem;
    padding: 30px 0;
    border-radius: 20px;
}
.modal h6 {
    margin: 10px;
}
.modal .modal-content {
    padding: 1rem;
}

.modal .modal-content .name {
    text-align: left;
    margin-bottom: 0;
}

.modal .modal-content .date {
    text-align: right;
    margin-bottom: 0;
}

.modal .modal-content .des {
    text-align: left;
    margin-bottom: 0;
}

.modal .modal-content img {
    width: 50%;
    border-radius: 10px;
}
.modal .close {
    position: absolute;
    top: 0;
    right: 0;
}

.close-img {
    width: 25px;
    cursor: pointer;
}

.check {
    width: 150px;
}

h6 {
    font-weight: 500;
    font-size: 28px;
    margin: 10px 0;
}

p {
    font-size: 16px;
    margin: 20px 0;
}

button {
    background-color: #ac003e;
    width: 150px;
    height: 40px;
    color: white;
    font-size: 14px;
    border-radius: 16px;
    margin-top: 50px;
}
</style>