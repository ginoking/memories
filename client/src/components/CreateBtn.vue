<template>
    <a href="#" class="effect5" @click="open">
        <i class="label">+</i>
    </a>
</template>
<script setup lang="ts">
import { ref, inject } from "vue"
import { useStore } from 'vuex'
import moment from 'moment'
import axiosInstance from '../axios/axios';

const swal = inject('$swal');

const open = () =>  {
    // Use sweetalert2
    swal({
        html: `
            <input type='text' class='swal2-input' name='name' id='name' placeholder='回憶名稱'>
            <input type='textarea' class='swal2-input' name='des' id='des' placeholder='簡單描述'>
            <input type='file' class='swal2-input' name='file' id='file' accept="image/png, image/jpeg, image/jpg">
            <input type='date' class='swal2-input' name='date' id='date'>
            `,
        width: '70%'
    });
}

</script>
<style scoped>
a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
    margin: 50px;

    border-radius: 190px;
    border: 3px solid #4d90d8;
    background: #8abae1;
    text-align: center;

    text-decoration: none;
    color: #4d90d8;

    transition: all .2s;
    position: absolute;
    bottom: 0;
    right: 0;
}

i {
    font-size: 22px;
    font-weight: bold;
    font-style: normal;
    transition: all .1s;
}

.effect5 {
    &:hover {
        box-shadow: 0px 0 0 11px #FFF, 0px 0 0 10px #27ae60, 0px 0 0 50px #FFF inset;
    }

    &:active {
        box-shadow: 0px 0 0 11px #27ae60, 0px 0 0 10px #27ae60, 0px 0 0 50px #FFF inset;

        i {
            color: #27ae60;
        }
    }
}

@media (max-width: 768px) {
    a {
        margin: 20px;
    }
}
</style>
