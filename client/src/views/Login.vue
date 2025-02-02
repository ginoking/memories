<template>
  <div class="container">
    <el-form
      label-width="auto"
      style="max-width: 600px"
      class="screen-1"
      label-position="top"
    >
      <el-form-item label="User Name">
        <el-input v-model="username" required />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="password" type="password" @keyup.enter="login" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="button" @click="login" :disabled="!username || !password"
          >Login</el-button
        >
        <el-button type="primary" class="button" @click="loginWithPasskey" :disabled="!username"
          >Login with Passkey</el-button
        >
      </el-form-item>
	  <div class="footer">
		<el-link type="info" @click="() => router.push('signup')">Sign up</el-link>
		<el-link type="info" @click="() => router.push('reset')">Forgot Password?</el-link>
	  </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '../axios/axios'
import { type SwalInstance } from '../interfaces/sweetalert'
import { startAuthentication } from '@simplewebauthn/browser'

const router = useRouter()

const username = ref<string>('')
const password = ref<string>('')
const $swal = inject('$swal') as SwalInstance

const login = async () => {
  const {
    data: { success, status, token, user }
  } = await axiosInstance.post('login', { username: username.value, password: password.value })
  if (success) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    $swal
      .fire({
        title: status,
        icon: 'success'
      })
      .then(() => router.push('/'))
  } else {
    $swal.fire({
      title: status,
      icon: 'error'
    })
  }
}

const loginWithPasskey = async () => {
  const { data } = await axiosInstance.post('passkey/login/start', { username: username.value })
  const attResp = await startAuthentication(data)
  const {
    data: { success, status, token, user }
  } = await axiosInstance.post('/passkey/login/finish', { username: username.value, data: attResp })
  if (success) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    $swal
      .fire({
        title: status,
        icon: 'success'
      })
      .then(() => router.push('/'))
  } else {
    $swal.fire({
      title: status,
      icon: 'error'
    })
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
