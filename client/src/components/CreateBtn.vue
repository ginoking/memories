<template>
    <a href="#" class="effect5">
        <i class="label">+</i>
    </a>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useStore } from 'vuex'
import moment from 'moment'
import axiosInstance from '../axios/axios';


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
