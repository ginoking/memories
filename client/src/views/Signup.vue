<template>
  <div class="container">
    <el-form
      ref="ruleFormRef"
      label-width="auto"
      style="max-width: 600px"
      class="screen-1"
      label-position="top"
      :rules="rules"
      :model="ruleForm"
    >
      <el-form-item label="User Name">
        <el-input v-model="ruleForm.username" required />
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          @keyup.enter="register(ruleFormRef)"
        />
      </el-form-item>
      <el-form-item label="Password Confirm">
        <el-input
          v-model="ruleForm.password2"
          type="password"
          @keyup.enter="register(ruleFormRef)"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="button"
          @click="register(ruleFormRef)"
          :disabled="!ruleForm.username || !ruleForm.password || !ruleForm.password2"
          >Register</el-button
        >
      </el-form-item>
      <div class="footer">
        <el-link type="info" @click="() => router.push('login')">Login</el-link>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '../axios/axios'
import { type SwalInstance } from '../interfaces/sweetalert'
import type { FormRules, FormInstance } from 'element-plus'
const router = useRouter()

const $swal = inject('$swal') as SwalInstance

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

const register = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const {
          data: { success, status, token, err }
        } = await axiosInstance.post('signup', {
          username: ruleForm.username,
          password: ruleForm.password,
          password2: ruleForm.password2
        })
        if (success) {
          localStorage.setItem('token', token)
          $swal.fire({ title: status }).then(() => router.push('login'))
        } else {
          $swal.fire({ title: status, icon: 'error' })
        }
      } catch (error: any) {
        $swal.fire({ title: error.response.data.message, icon: 'error' })
      }
    }
  })
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

.el-button + .el-button {
  margin-left: 0;
}
</style>
