<template>
    <a href="#" class="effect5" @click="open">
        <i class="label">+</i>
    </a>
    <el-dialog v-model="showContent">
        <el-form label-width="auto" label-position="top">
            <el-form-item label="Date:">
                <el-date-picker v-model="eventDate" type="date" placeholder="Pick a day" />
            </el-form-item>
            <el-form-item label="Type:">
                <el-select v-model="selectType" placeholder="Select" style="width: 100%">
                    <el-option v-for="item in emojis" :key="item.key" :label="item.text" :value="item.key" />
                </el-select>
            </el-form-item>
            <el-form-item label="Name:">
                <el-input required v-model="eventName" />
            </el-form-item>
            <el-form-item label="Description:">
                <el-mention v-model="eventDes" type="textarea" style="width: 100%" placeholder="Please input" />
            </el-form-item>

            <el-form-item label="Image:">
                <el-upload 
                    :class="{hide:isHideUpload}" 
                    v-model:file-list="fileList" 
                    action="#" 
                    list-type="picture-card" 
                    :auto-upload="false"
                    :on-change="handleChange"
                >
                    <el-icon>
                        <Plus />
                    </el-icon>

                    <template #file="{ file }">
                        <div>
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                                    <el-icon>
                                        <Delete />
                                    </el-icon>
                                </span>
                            </span>
                        </div>
                    </template>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" @click="create">Create</el-button>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance, inject } from "vue"
import axiosInstance from '../axios/axios';
import emojis from "../helpers/emojis"
import { Plus, Delete } from '@element-plus/icons-vue'
import { type SwalInstance } from '../interfaces/sweetalert'

const app = getCurrentInstance();
const $swal = inject('$swal') as SwalInstance
const moment = app?.appContext.config.globalProperties.$moment;
const showContent = ref<boolean>(false);
const selectFile = ref<File>();
const eventName = ref<string>("");
const eventDes = ref<string>("");
const eventDate = ref<Date>(new Date);
const selectType = ref<string>("");
const isHideUpload = ref<boolean>(false);
const fileList = ref<UploadUserFile[]>([])

const open = () => {
    showContent.value = true;
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    const index = fileList.value.indexOf(uploadFile);
    fileList.value.splice(index, 1);
    isHideUpload.value = fileList.value.length == 1;
}

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
    fileList.value = uploadFiles
    isHideUpload.value = fileList.value.length == 1;
}

const create = () => {
    selectFile.value = fileList.value[0].raw;
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
        $swal.fire("Done");
        showContent.value = false;
    }).catch((error) => {
        $swal.fire(error.response.data.message);
    });
}

</script>
<style scoped>
:deep(.el-date-editor.el-input) {
    width: 100%;
}

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

@media (max-width: 768px) {
    a {
        margin: 20px;
    }
}

.effect5>i {
    font-size: 1.5rem;
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

:deep(.hide .el-upload--picture-card) {
    display: none;
}
</style>
