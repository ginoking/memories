<template>
	<div class="screen-1">
		<div class="container">
			<div class="email">
				<label for="email">Email Address</label>
				<div class="sec-2">
					<MdMailIcon />
					<input type="email" name="email" placeholder="Username@gmail.com" />
				</div>
			</div>
			<div class="password">
				<label for="password">Password</label>
				<div class="sec-2">
					<MdLockIcon />
					<input class="pas" type="password" name="password" placeholder="············" />
					<MdEyeIcon :class="'show-hide'" />
				</div>
			</div>
			<button class="login">Login</button>
			<div class="footer"><span>Sign up</span><span>Forgot Password?</span></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import MdEyeIcon from 'vue-ionicons/dist/md-eye.vue'
import MdLockIcon from 'vue-ionicons/dist/md-lock.vue'
import MdMailIcon from 'vue-ionicons/dist/md-mail.vue'

</script>

<style scoped>
body {
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
	margin-top: -3em;
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

.screen-1 .container .email ion-icon {
	color: #4d4d4d;
	margin-bottom: -0.2em;
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

.screen-1 .container .password ion-icon {
	color: #4d4d4d;
	margin-bottom: -0.2em;
}

.screen-1 .container .password .show-hide {
	margin-right: -5em;
}

.screen-1 .container .login {
	padding: 1em;
	background: #3e4684;
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
	padding-bottom: 10em;
}

.screen-1 .container .footer span {
	cursor: pointer;
}

button {
	cursor: pointer;
}
</style>
