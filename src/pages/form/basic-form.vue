<script setup lang="ts">
import { ElMessage, type FormRules } from 'element-plus'
import { useAsync, useForm } from '@/composables'

const { form, form$, validate, resetFields } = useForm({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

/**
 * 小知识：为什么不用ref 或者 reactive
 * 当你的数据不会修改或者不用响应式就直接定义变量就可以了，还能提交一点点点点性能
 */
const rules: FormRules = {
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
  ],
  region: { required: true, message: '请选择活动区域', trigger: 'change' },
  date1: { type: 'date', required: true, message: '请选择日期', trigger: 'change' },
  date2: { type: 'date', required: true, message: '请选择时间', trigger: 'change' },
  type: { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' },
  resource: { required: true, message: '请选择活动资源', trigger: 'change' },
  desc: { required: true, message: '请填写活动形式', trigger: 'blur' },

}

// 模拟api请求
const { execute: mockSubmitApi, isLoading } = useAsync(() => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
})

async function submitForm() {
  await validate()
  await mockSubmitApi()
  ElMessage.success('创建成功')
}
console.log('basic-form')
</script>

<template>
  <layout-page-header title="基础表单" desc="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。" />
  <el-card m-3 shadow="never">
    <el-form ref="form$" class="max-w-600px mx-auto py-3" label-position="top" :model="form" :rules="rules">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="1">
          -
        </el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type" />
          <el-checkbox label="地推活动" name="type" />
          <el-checkbox label="线下主题活动" name="type" />
          <el-checkbox label="单纯品牌曝光" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助" />
          <el-radio label="线下场地免费" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="isLoading" @click="submitForm()">
          立即创建
        </el-button>
        <el-button @click="resetFields()">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<route lang="yaml">
meta:
  name: 基础表单
</route>
