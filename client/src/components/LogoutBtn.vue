<template>
    <a href="#" class="effect5" @click="logout">
        <i class="gg-log-out"></i>
    </a>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import axiosInstance from '../axios/axios';
import Swal, { type SweetAlertOptions } from 'sweetalert2'

const router = useRouter();

const logout = async () => {
    localStorage.removeItem('token');
    router.push('login')
    // try {
    //     const { data: { status } } = await axiosInstance.get('logout');
    //     if (status) {
    //         const swalOptions = <SweetAlertOptions>{
    //             title: 'Logout success!',
    //             icon: 'success',
    //             width: '90%',
    //         };
    //         Swal.fire(swalOptions).then(() => router.push('login'));
    //     }
    // } catch (error) {
    //     const swalOptions = <SweetAlertOptions>{
    //         title: error,
	// 		icon: 'error',
    //         showConfirmButton: false,
    //         width: '90%',
    //     };
    //     Swal.fire(swalOptions);
    // }
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
    position: fixed;
    bottom: 0;
    left: 0;
}

.effect5>i {
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

.gg-log-out {
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 6px;
    height: 16px;
    border: 2px solid;
    transform: scale(var(--ggs, 1));
    border-right: 0;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    margin-left: -10px
}

.gg-log-out::after,
.gg-log-out::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute
}

.gg-log-out::after {
    border-top: 2px solid;
    border-left: 2px solid;
    transform: rotate(-45deg);
    width: 8px;
    height: 8px;
    left: 4px;
    bottom: 2px
}

.gg-log-out::before {
    border-radius: 3px;
    width: 10px;
    height: 2px;
    background: currentColor;
    left: 5px;
    bottom: 5px
}
</style>
