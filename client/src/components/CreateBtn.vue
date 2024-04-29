<template>
    <a href="#" class="effect5" @click="open">
        <i class="label">+</i>
    </a>
    <div ref="modelContent">
        <div class="model-content" v-if="showContent">
            <label for="" class="swal2-input-label">Type:</label>
            <TypeSelector default-text="Select type" @sendType="getTypeFromSelect" />
            <label for="" class="swal2-input-label">Name:</label>
            <input type="text" class="swal2-input" v-model="eventName">
            <label for="" class="swal2-input-label">Description:</label>
            <textarea class="swal2-textarea" name="" id="" cols="30" rows="10"
                v-model="eventDes">{{ eventDes }}</textarea>
            <label for="" class="swal2-input-label">Date:</label>
            <VueDatePicker auto-apply v-model="eventDate" :enable-time-picker="false"
                :format="() => moment(eventDate).format('L')">
                <template #action-buttons></template>
                <template #action-preview></template>
            </VueDatePicker>
            <label for="" class="swal2-input-label">Image:</label>
            <input id="file-input" type="file" @change="fileChange"
                accept="image/png, image/jpeg, image/jpg, image/gif">
            <label for="file-input" class="input-file-trigger">Select a image</label>
            <img class="preview" :src="imageUrl" alt="">
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance } from "vue"
import axiosInstance from '../axios/axios';
import Swal from 'sweetalert2'
import TypeSelector from "./TypeSelector.vue";

const app = getCurrentInstance();
const moment = app?.appContext.config.globalProperties.$moment;
const showContent = ref<boolean>(false);
const selectFile = ref<File>();
const eventName = ref<string>("");
const eventDes = ref<string>("");
const eventDate = ref<Date>(new Date);
const modelContent = ref<HTMLDivElement>();
const selectType = ref<string>("");
const imageUrl = ref<string>("");

const getTypeFromSelect = (data) => selectType.value = data

const open = () => {
    const swalOptions = {
        html: modelContent.value,
        width: '90%',
        // showCancelButton: true,
        confirmButtonText: "Create",
        confirmButtonColor: "#4d90d8",
        // cancelButtonText: "取消",
        customClass: {
            input: 'text-left',
            inputLabel: 'text-left'
        },
        preConfirm: () => {
            if (eventName.value == '' || eventDes.value == '' || !selectFile.value || selectType.value == '') {
                return false;
            }
        }
    };

    if (window.innerWidth >= 1200) swalOptions.width = '50%';
    else if (window.innerWidth >= 768) swalOptions.width = '70%';
    showContent.value = true;
    // Use sweetalert2
    Swal.fire(swalOptions).then((result) => {
        if (result.isConfirmed) {
            create();
        }
    });
}

const fileChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files[0]) {
        imageUrl.value = URL.createObjectURL(files[0]);
        selectFile.value = files[0];
    }
}
const create = () => {
    const formData = new FormData;
    formData.append("type", selectType.value);
    formData.append("file", selectFile.value!);
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
}

.effect5>i {
    font-size: 1.5rem;
    font-weight: bold;
    font-style: normal;
    transition: all .1s;
}

.dp__action_buttons {
    flex: 1 !important;
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

.effect5:hover {
    box-shadow: 0px 0 0 11px #fff, 0px 0 0 10px #27ae60, 0px 0 0 50px #fff inset;
}

.effect5:active {
    box-shadow: 0px 0 0 11px #27ae60, 0px 0 0 10px #27ae60, 0px 0 0 50px #fff inset;
}

.effect5:active i {
    color: #27ae60;
}

input[type=file] {
    width: 0px;
    opacity: 0;
}

.input-file-trigger {
    margin: 1.5rem;
    display: block;
    padding: 14px 45px;
    background-color: var(--color-background);
    color: #fff;
    font-size: 1em;
    transition: all .4s;
    cursor: pointer;
}

.preview {
    margin: 0.5rem;
    width: 80%;
    /* margin: 0.5rem 0; */
}

.swal2-confirm .swal2-styled {
    background-color: var(--color-background);
}

.type-select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 7px 40px 7px 12px;
    width: 100%;
    border: 1px solid #e8eaed;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0 1px 3px -2px #9098a9;
    cursor: pointer;
    font-family: inherit;
    font-size: 16px;
    transition: all 150ms ease;
    margin: 0.5rem 0;
    color: var(--color-text);
}

@media (max-width: 768px) {
    a {
        margin: 20px;
    }
}
</style>
