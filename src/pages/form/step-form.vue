<script setup lang="ts">
import { type FormRules } from 'element-plus'

import { useAsync, useForm } from '@/composables'

const { form, form$, validate, resetForm } = useForm({
  formAccount: 'formAccount@maodou.cloud',
  toAccount: '',
  accountType: '微信',
  toName: '',
  amount: '',
  password: '',
})

/**
 * 小知识：为什么不用ref 或者 reactive
 * 当你的数据不会修改或者不用响应式就直接定义变量就可以了，还能提交一点点点点性能
 */
const rules: FormRules = {
  formAccount: { required: true, message: '请选择付款账户', trigger: 'change' },
  toAccount: { required: true, message: '请输入收款账户', trigger: 'change' },
  toName: { required: true, message: '请输入收款人姓名', trigger: 'change' },
  amount: { required: true, message: '请输入转账金额', type: 'number', trigger: 'change' },
  password: { required: true, message: '请输入支付密码', trigger: 'change' },
}

const currentStep = ref(0)

// 模拟api请求
const { execute: mockSubmitApi, isLoading } = useAsync(() => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
})

async function stepNext() {
  await validate()
  if (currentStep.value === 1) {
    await mockSubmitApi()
  }
  currentStep.value = Math.min(2, currentStep.value + 1)
}

function stepBack() {
  currentStep.value = Math.max(0, currentStep.value - 1)
}

function restart() {
  currentStep.value = 0
  resetForm()
}

</script>

<template>
  <layout-page-header title="分步表单" desc="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。" />
  <el-card m-3 shadow="never">
    <div class="max-w-960px mx-auto mb-4">
      <el-steps align-center finish-status="success" :active="currentStep">
        <el-step title="填写转账信息" />
        <el-step title="确认转账信息" />
        <el-step title="完成" />
      </el-steps>
    </div>
    <div class="max-w-400px mx-auto py-3">
      <el-form ref="form$" label-position="top" :model="form" :rules="rules">
        <template v-if="currentStep === 0">
          <el-form-item label="付款账户" prop="formAccount">
            <el-select v-model="form.formAccount" flex-1>
              <el-option value="formAccount@maodou.cloud" />
            </el-select>
          </el-form-item>
          <el-form-item label="收款账户" prop="toAccount">
            <el-select v-model="form.accountType" class="w-100px">
              <el-option value="微信" />
              <el-option value="支付宝" />
            </el-select>
            <el-input v-model="form.toAccount" class="flex-1 ml" placeholder="请输入收款账号" />
          </el-form-item>
          <el-form-item label="收款人姓名" prop="toName">
            <el-input v-model="form.toName" placeholder="请输入收款人姓名" />
          </el-form-item>
          <el-form-item label="转账金额" prop="amount">
            <el-input v-model.number="form.amount" type="number" placeholder="请输入转账金额">
              <template #prefix>
                ￥
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="stepNext()">
              下一步
            </el-button>
          </el-form-item>
        </template>

        <template v-else-if="currentStep === 1">
          <el-descriptions :column="1" border>
            <el-descriptions-item label="付款账户">
              {{ form.formAccount }}
            </el-descriptions-item>
            <el-descriptions-item label="收款账户">
              {{ form.toAccount }}
            </el-descriptions-item>
            <el-descriptions-item label="收款人姓名">
              {{ form.toName }}
            </el-descriptions-item>
            <el-descriptions-item label="转账金额">
              <span class="text-2xl">{{ form.amount }}</span> 元
            </el-descriptions-item>
          </el-descriptions>
          <el-divider />
          <el-form-item label="支付密码" prop="password">
            <el-input v-model="form.password" type="password" show-password placeholder="请输入支付密码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="isLoading" @click="stepNext()">
              确认转账
            </el-button>
            <el-button @click="stepBack()">
              上一步
            </el-button>
          </el-form-item>
        </template>

        <template v-if="currentStep === 2">
          <el-result
            icon="success"
            title="操作成功"
            sub-title="预计两小时内到账"
          >
            <template #extra>
              <el-button type="primary" @click="restart">
                再转一笔
              </el-button>
              <el-button>
                查看账单
              </el-button>
            </template>
          </el-result>
        </template>
      </el-form>
    </div>
  </el-card>
</template>

<route lang="yaml">
meta:
  name: 分步表单
</route>
