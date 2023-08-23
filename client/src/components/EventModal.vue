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
                <img src="123459789" alt="">
                <p class="des">{{ event.des }}</p>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import moment from 'moment';
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
    max-height: 500px;
    width: 550px;
    margin-top: 10%;
    padding: 30px 0;
    border-radius: 20px;
}
.modal .modal-content {
    padding: 1rem;
}

.modal .modal-content .name {
    text-align: left;
}

.modal .modal-content .date {
    text-align: right;
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
    margin: 20px 0;
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