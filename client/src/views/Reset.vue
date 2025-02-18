<template>
	<div class="container">
		<el-form label-width="auto" style="max-width: 600px" class="screen-1" label-position="top" :rules="rules" :model="ruleForm" ref="ruleFormRef">
			<el-form-item label="User Name">
				<el-input v-model="ruleForm.username" required />
			</el-form-item>
			<el-form-item>
				<el-button v-if="!exists" type="primary" class="button" @click="check" @keyup.enter="check"
					:disabled="!ruleForm.username">Check
					User</el-button>
			</el-form-item>
			<el-form-item v-if="exists" label="Password">
				<el-input v-model="ruleForm.password" type="password" @keyup.enter="reset" />
			</el-form-item>
			<el-form-item v-if="exists" label="Password Confirm">
				<el-input v-model="ruleForm.password2" type="password" @keyup.enter="reset" />
			</el-form-item>
			<el-form-item v-if="exists">
				<el-button type="primary" class="button" @click="reset"
					:disabled="!ruleForm.password || !ruleForm.password2">Reset</el-button>
			</el-form-item>
			<div class="footer">
				<el-link type="info" @click="() => router.push('login')">Login</el-link>
			</div>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { ref, inject, reactive } from "vue"
import { useRouter } from 'vue-router'
import axiosInstance from '../axios/axios';
import type { SwalInstance } from "../interfaces/sweetalert";
import type { FormRules, FormInstance } from 'element-plus'

const router = useRouter();

const ruleFormRef = ref<FormInstance>()

interface RuleForm {
	username: string
	password: string
	password2: string
}

const ruleForm = reactive<RuleForm>({
	username: '',
	password: '',
	password2: ''
})

const validatePass2 = (rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('Please input the password again'))
	} else if (value !== ruleForm.password) {
		callback(new Error("Two inputs don't match!"))
	} else {
		callback()
	}
}

const rules = reactive<FormRules<RuleForm>>({
	username: [{ required: true, message: 'Please input username', trigger: 'blur' }],
	password: [{ required: true, message: 'Please input password', trigger: 'blur' }],
	password2: [{ validator: validatePass2, trigger: 'blur' }]
})

const exists = ref<boolean>(false);
const $swal = inject('$swal') as SwalInstance

const check = async () => {
	try {
		const { data: { success, status, token, err } } = await axiosInstance.post('check', { username: ruleForm.username })
		exists.value = success;
	} catch (error) {
		// 目前axios http 500 貌似catch會沒有觸發
		console.log(error);
	}
}

const reset = async () => {
	try {
		const { data: { success, status } } = await axiosInstance.post('reset', {
			username: ruleForm.username,
			password: ruleForm.password,
			password2: ruleForm.password2
		})
		if (success) {
			$swal.fire({ title: status }).then(() => router.push('login'));
		}
	} catch (error: any) {
		$swal.fire({ title: error.response.data.message, icon: 'error' })
	}
}

</script>

<style scoped>
.container {
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}

.screen-1 {
	background: #f1f7fe;
	padding: 2em;
	border-radius: 30px;
	gap: 2em;
	width: 50%;
}

.footer {
	display: flex;
	justify-content: space-between;
	font-size: 0.7em;
	width: 100%;
	margin-top: 50px;
}

.button {
	margin: 5px 0;
	width: 100%;
	font-family: 'Shantell Sans', cursive;
}

.el-button+.el-button {
	margin-left: 0;
}

@media screen and (max-width: 768px) {
	.screen-1 {
		width: 75%;
	}
}
</style>