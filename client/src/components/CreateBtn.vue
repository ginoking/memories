<template>
    <a href="#" class="effect5" @click="open">
        <i class="label">+</i>
    </a>
    <div ref="modelContent">
        <div class="model-content" v-if="showContent">
            <label for="" class="swal2-input-label">Name:</label>
            <input type="text" class="swal2-input" v-model="eventName">
            <label for="" class="swal2-input-label">Description:</label>
            <textarea class="swal2-textarea" name="" id="" cols="30" rows="10" v-model="eventDes">{{ eventDes }}</textarea>
            <label for="" class="swal2-input-label">Date:</label>
            <VueDatePicker class="datetime-input" auto-apply v-model="eventDate" :enable-time-picker="false" :format="format" >
                <template #action-buttons></template>
                <template #action-preview></template>
            </VueDatePicker>
            <label for="" class="swal2-input-label">Image:</label>
            <input class="swal2-file" type="file" @change="fileChange">
            <!-- <button @click="create">upload</button> -->


            <!-- <div>
                name:{{ eventName }}<br>
                description:{{ eventDes }}<br>
                date: {{ eventDate.getFullYear() + "/" + (eventDate.getMonth() + 1) + "/" + eventDate.getDate() }}
            </div> -->
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import axiosInstance from '../axios/axios';
import Swal from 'sweetalert2'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const showContent = ref<boolean>(false);
const selectFile = ref<File>();
const eventName = ref<string>("");
const eventDes = ref<string>("");
const eventDate = ref<Date>(new Date);
const modelContent = ref<HTMLDivElement>();

const format = () => {
    return eventDate.value.getFullYear() + "/" + (eventDate.value.getMonth() + 1) + "/" + eventDate.value.getDate();
}

const open = () => {
    const swalOptions = {
        html: modelContent.value,
        width: '90%',
        showCancelButton: true,
        confirmButtonText: "建立",
        cancelButtonText: "取消",
        customClass: {
            input: 'text-left',
            inputLabel: 'text-left'
        },
        preConfirm: () => {
            if (eventName.value == '' || eventDes.value == '' || !selectFile.value) {
                return false;
            }
        }
    };

    if (window.innerWidth >= 1200) swalOptions.width = '50%';
    else if(window.innerWidth >= 768) swalOptions.width = '70%';
    showContent.value = true;
    // Use sweetalert2
    Swal.fire(swalOptions).then((result) => {
        if (result.isConfirmed) {
            create();
        }
    });
}

const fileChange = (e: Event) => {
    selectFile.value = e.target.files[0];
}
const create = () => {
    const formData = new FormData;
    formData.append("file", selectFile.value);
    formData.append("name", eventName.value);
    formData.append("des", eventDes.value);
    formData.append("date", eventDate.value.toLocaleDateString('zh').replaceAll('/', '-'));
    axiosInstance.post("create", formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
    ).then((response) => {
        Swal.fire("Done");
    }).catch((error) => {
        Swal.fire(error.response.data.message);
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
    position: fixed;
    bottom: 0;
    right: 0;
}

i {
    font-size: 22px;
    font-weight: bold;
    font-style: normal;
    transition: all .1s;
}

.dp__action_buttons {
    flex: 1!important;
}

.model-content >>> .datetime-input {
    box-sizing: border-box;
    transition: border-color .1s,box-shadow .1s;
    border: 1px solid #d9d9d9;
    border-radius: 0.1875em;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .06);
    color: inherit;
    width: 100%;
    height: 2.625rem;
    margin: 0.5rem 0;
    padding: 0 0.75rem;
    font-size: 1.125rem;
}
.swal2-input {
    width: 100%;
    margin: 0.5rem 0;
}

.swal2-textarea {
    width: 100%;
    margin: 0.5rem 0;
}

.swal2-file {
    width: 100%;
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
