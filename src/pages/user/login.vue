<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { type FormInstance, type FormRules } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { login } from '@/api/user'
import { isDark, toggleDark, useAsync } from '@/composables'

const router = useRouter()
const route = useRoute()

const form$ = ref<FormInstance>()
const form = reactive({
  username: 'admin',
  password: '123456',
})

const store = useUserStore()

const { execute: onLogin, isLoading } = useAsync(async() => {
  await form$.value?.validate()
  const userInfo = await login(form.username, form.password)
  store.setUserInfo(userInfo)

  router.replace(route.query?.returnUrl?.toString() || '/')
})

const rules: FormRules = {
  username: { required: true, message: '请输入用户名' },
  password: { required: true, message: '请输入密码' },
}

</script>

<template>
  <div class="login">
    <div my-4 text-right>
      <el-button type="text" mr-5 @click="toggleDark()">
        <div :class="isDark ? 'i-ep-moon' : 'i-ep-sunny'" text-xl />
      </el-button>
      <!-- <div text-xl px-4 @click="toggleDark()" /> -->
    </div>
    <div text-center pt-100px>
      <div>
        <span font-600 text-4xl class="color-p">MDAdmin</span>
      </div>
      <div text-sm mt-sm mb-4xl class="color-s">
        基于 Vue3 + Ts + Element Plus 的后台应用
      </div>
    </div>
    <div w328px ma>
      <el-form
        ref="form$"
        :model="form"
        :rules="rules"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            prefix-icon="i-ep-user"
            @keyup.enter="onLogin()"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            type="password"
            prefix-icon="i-ep-lock"
            @keyup.enter="onLogin()"
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox label="自动登录" />
          <el-link ml-a type="primary" :underline="false">
            忘记密码?
          </el-link>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" :loading="isLoading" @click="onLogin()">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  height: 100vh;
  overflow: auto;
  background-color: var(--el-bg-color-page);
  background-image: url(@/assets/login-bg.svg);
}
</style>

<route lang="yaml">
meta:
  layout: empty
</route>
