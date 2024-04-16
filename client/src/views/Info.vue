<template>
	<div class="body">
		<div class="screen-1">
			<div class="container">
				<div class="email">
					<label for="email">User Name</label>
					<div class="sec-2">
						<input type="text" name="username" disabled v-model="username"/>
					</div>
				</div>
				<div class="password">
					<label for="password">Password</label>
					<div class="sec-2">
						<input class="pas" v-model="password" type="password" name="password" placeholder="············" />
					</div>
				</div>
				<div class="password">
					<label for="password">Password Confirm</label>
					<div class="sec-2">
						<input class="pas" v-model="password2" type="password" name="password"
							placeholder="············" />
					</div>
				</div>
				<button class="login" @click="reset">Reset Password</button>
				<button class="login" @click="bind">Bind Passkey</button>
			</div>
			<!-- <div class="container">
				log
			</div> -->
		</div>
	</div>
	<a href="#" class="effect5" @click="() => router.back()">
        <i class="label">{{ '<' }}</i>
    </a>
</template>

<script setup lang="ts">
import { ref, inject } from "vue"
import { useRouter } from 'vue-router'
import axiosInstance from '../axios/axios';
import { type SwalInstance } from "../interfaces/sweetalert";
import { startRegistration } from '@simplewebauthn/browser';

const router = useRouter();
const username = localStorage.getItem("user");

const password = ref<string>('');
const password2 = ref<string>('');
const error = ref<string>('');
const $swal = inject('$swal') as SwalInstance

const reset = async () => {
	if (password.value != password2.value) {
		error.value = 'Two password not same';
	}
	try {
		const { data: { success, status, token, err } } = await axiosInstance.post('reset-password', { password: password.value })
		if (success) {
			$swal.fire({
				title: status
			});
		}
	} catch (error) {
		// 目前axios http 500 貌似catch會沒有觸發
		console.log(error);
	}
}

const bind = async () => {
	try {
		const { data } = await axiosInstance.get('/passkey/register/start')
		// alert(JSON.stringify(data));
		
		const attResp = await startRegistration(data);
		// console.log(attResp);
		
		finish(attResp);
		
	} catch (error) {
		// 目前axios http 500 貌似catch會沒有觸發
		console.log(error);
		// alert(error)
	}
	
}

const finish = async (options) => {
	const { data } = await axiosInstance.post('/passkey/register/finish', { data: options })
	
	if (data && data.verified) {
		$swal.fire({ title: 'Bind success!' });
	}
	else {
		$swal.fire({
			icon: 'error',
			title: 'Bind success!' 
		});
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
	background: #8abae1;
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

.screen-1 .container .email {
	background: white;
	/* box-shadow: 0 0 2em #e6e9f9; */
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
	/* box-shadow: 0 0 2em #e6e9f9; */
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
	color: var(--color-text);
	gap: 14em;
	/* padding-bottom: 10em; */
}

.screen-1 .container .footer span {
	cursor: pointer;
}

button {
	cursor: pointer;
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
	position: fixed;
	bottom: 0;
	left: 0;
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
	a {
        margin: 20px;
    }
}

@media (max-width: 414px) {
	.body {
		width: 80%;
	}
}
</style>
