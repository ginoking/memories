<template>
    <router-link to="info" class="effect5">
        <i class="pi pi-user"></i>
    </router-link>
</template>
<script setup lang="ts">

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
}

:deep(svg) {
    fill: #4d90d8;
}

.effect5>i {
    font-size: 22px;
    font-weight: bold;
    font-style: normal;
    transition: all .1s;
}

.effect5:hover {
    box-shadow: 0px 0 0 11px #fff, 0px 0 0 10px #27ae60, 0px 0 0 50px #fff inset;
}

.effect5:active {
    box-shadow: 0px 0 0 11px #27ae60, 0px 0 0 10px #27ae60, 0px 0 0 50px #fff inset;
}

.effect5:active i {
    color: #27ae60;
}

@media (max-width: 768px) {
    a {
        margin: 20px;
    }
}
</style>
