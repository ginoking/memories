<template>
	<div class="container">
		<el-form ref="ruleFormRef" label-width="auto" style="max-width: 600px" class="screen-1" label-position="top"
			:rules="rules" :model="ruleForm">
			<el-form-item label="User Name">
				<el-input v-model="ruleForm.username" required readonly />
			</el-form-item>
			<el-form-item label="Password">
				<el-input v-model="ruleForm.password" type="password" @keyup.enter="reset" />
			</el-form-item>
			<el-form-item label="Password Confirm">
				<el-input v-model="ruleForm.password2" type="password" @keyup.enter="reset" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" class="button" @click="reset"
					:disabled="!ruleForm.password || !ruleForm.password2">Reset Password</el-button>
			</el-form-item>
			<el-form-item v-if="passkeyCheck">
				<el-button type="primary" class="button" @click="bind"
					:disabled="!passkeyCheck">Bind Passkey</el-button>
			</el-form-item>
			<div class="footer">
				<el-link type="info" @click="() => router.push('/')">Back</el-link>
			</div>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { ref, inject, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '../axios/axios';
import { type SwalInstance } from "../interfaces/sweetalert";
import { startRegistration } from '@simplewebauthn/browser';
import type { FormRules, FormInstance } from 'element-plus'
import canPasskey from '../helpers/canPasskey';

const router = useRouter()

const $swal = inject('$swal') as SwalInstance

const user = JSON.parse(localStorage.getItem("user") ?? '');

const passkeyBound = ref<boolean>(false);
const passkeyCheck = canPasskey();

const ruleFormRef = ref<FormInstance>()

interface RuleForm {
	username: string
	password: string
	password2: string
}

const ruleForm = reactive<RuleForm>({
	username: user.username,
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

const reset = async () => {
	
	try {
		const { data: { success, status, token, err } } = await axiosInstance.post('reset-password', ruleForm)
		if (success) {
			$swal.fire({
				title: status
			});
		}
	} catch (error: any) {
		$swal.fire({
			icon: 'error',
			title: error.response.data.message
		});
	}
}

const bind = async () => {
	try {
		const { data } = await axiosInstance.get('/passkey/register/start')

		const attResp = await startRegistration(data);

		finish(attResp);

	} catch (error: any) {
		passkeyBound.value = true;
		if (error.message === 'The authenticator was previously registered') {
			$swal.fire({
				icon: 'info',
				title: 'Already bind'
			});
		}
		else {
			$swal.fire({
				icon: 'info',
				title: 'System Error'
			});
		}
	}

}

const finish = async (options: object) => {
	const { data } = await axiosInstance.post('/passkey/register/finish', { data: options })

	if (data) {
		passkeyBound.value = true;
		$swal.fire({ title: 'Bind success!' });
	}
	else {
		$swal.fire({
			icon: 'error',
			title: 'Bind Error QQ'
		});
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
</style>
