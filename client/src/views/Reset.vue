<template>
	<div class="body">
		<div class="screen-1">
			<div class="container">
				<div class="email">
					<label for="email">User Name</label>
					<div class="sec-2">
						<input type="text" name="username" placeholder="gino" v-model="username" />
					</div>
				</div>

				<div v-if="exists">
					<div class="password">
						<label for="password">New Password</label>
						<div class="sec-2">
							<input class="pas" v-model="password" type="password" name="password"
								placeholder="············" />
						</div>
					</div>
					<div class="password">
						<label for="password">New Password Confirm</label>
						<div class="sec-2">
							<input class="pas" v-model="password2" type="password" name="password"
								placeholder="············" />
						</div>
					</div>
				</div>
				<span class="error" v-if="error">{{ error }}</span>
				<button v-if="!exists" class="login" @click="check">Check User</button>
				<button v-else class="login" @click="reset">Reset Password</button>
				<div class="footer">
					<span @click="() => router.push('login')">Login</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue"
import { useRouter } from 'vue-router'
import axiosInstance from '../axios/axios';
import type { SwalInstance } from "../interfaces/sweetalert";

const router = useRouter();

const username = ref<string>('');
const password = ref<string>('');
const password2 = ref<string>('');
const error = ref<string>('');
const exists = ref<boolean>(false);
const $swal = inject('$swal') as SwalInstance

const check = async () => {
	try {
		const { data: { success, status, token, err } } = await axiosInstance.post('check', { username: username.value })
		exists.value = success;
	} catch (error) {
		// 目前axios http 500 貌似catch會沒有觸發
		console.log(error);
	}
}

const reset = async () => {
	if (password.value != password2.value) {
		error.value = 'Two password not same';
	}
	try {
		const { data: { success, status, token, err } } = await axiosInstance.post('reset', { username: username.value, password: password.value })
		if (success) {
			$swal.fire({ title: status }).then(() => router.push('login'));
		}
	} catch (error) {
		// 目前axios http 500 貌似catch會沒有觸發
		console.log(error);
	}
}

</script>

<style scoped>
.body {
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	overflow-y: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	/* background: #dde5f4; */
	height: 100vh;
	width: 25%;
}

.screen-1 {
	width: 100%;
}

.screen-1 .container {
	background: #f1f7fe;
	padding: 2em;
	display: flex;
	flex-direction: column;
	border-radius: 30px;
	/* box-shadow: 0 0 2em #e6e9f9; */
	gap: 2em;
}

.sec-2 {
	display: flex;
}

.screen-1 .container {
	display: flex;
}

.screen-1 .container .logo {
	margin-top: -3em;
}

.screen-1 .container .email {
	background: white;
	box-shadow: 0 0 2em #e6e9f9;
	padding: 1em;
	display: flex;
	flex-direction: column;
	gap: 0.5em;
	border-radius: 20px;
	color: #4d4d4d;
}

.screen-1 .container .email input {
	outline: none;
	border: none;
}

.screen-1 .container .email input::-moz-placeholder {
	color: black;
	font-size: 0.9em;
}

.screen-1 .container .email input:-ms-input-placeholder {
	color: black;
	font-size: 0.9em;
}

.screen-1 .container .email input::placeholder {
	color: black;
	font-size: 0.9em;
}

.screen-1 .container .password {
	background: white;
	box-shadow: 0 0 2em #e6e9f9;
	padding: 1em;
	display: flex;
	flex-direction: column;
	gap: 0.5em;
	border-radius: 20px;
	color: #4d4d4d;
}

.screen-1 .container .password input {
	outline: none;
	border: none;
}

.screen-1 .container .password input::-moz-placeholder {
	color: black;
	font-size: 0.9em;
}

.screen-1 .container .password input:-ms-input-placeholder {
	color: black;
	font-size: 0.9em;
}

.screen-1 .container .password input::placeholder {
	color: black;
	font-size: 0.9em;
}

.screen-1 .container .password .show-hide {
	margin-right: -5em;
}

.screen-1 .container .login {
	padding: 1em;
	background-color: var(--color-background);
	color: white;
	border: none;
	border-radius: 30px;
	font-weight: 600;
}

.screen-1 .container .footer {
	display: flex;
	font-size: 0.7em;
	color: #5e5e5e;
	gap: 14em;
	/* padding-bottom: 10em; */
}

.screen-1 .container .footer span {
	cursor: pointer;
}

button {
	cursor: pointer;
}

.error {
	color: red;
}

:deep(svg) {
	fill: #4d4d4d;
	margin-bottom: -0.2em;
}

@media (max-width: 768px) {
	.body {
		width: 60%;
	}
}

@media (max-width: 414px) {
	.body {
		width: 80%;
	}
}
</style>
