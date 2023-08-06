<template>
    <div class="modal-overlay" @click.self="close">
        <div class="modal">
            <h6>{{ title }}</h6>
            <p>{{ date }}</p>
            <p>{{ des }}</p>
        </div>
        <div class="close" @click="close">
            <img class="close-img" src="../assets/close-icon.svg" alt="" />
        </div>
    </div>
</template>
  
<script setup lang="ts">
const props = defineProps<{
  title?: string
  date?: string
  image?: string
  des?: string
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
    text-align: center;
    background-color: #ccc;
    height: 500px;
    width: 500px;
    margin-top: 10%;
    padding: 60px 0;
    border-radius: 20px;
}

.close {
    margin: 10% 0 0 16px;
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