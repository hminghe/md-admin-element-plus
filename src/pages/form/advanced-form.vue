<script setup lang="ts">
import { useAsync, useForm } from '@/composables'
import { getCurrentWindow } from '@/components/multi-window'

const currentWindow = getCurrentWindow()

interface User {
  id: number
  name: string
  number: string
  department: string
}

const { form } = useForm({
  name: '',
  domain: '',
  manager: '',
  approver: '',
  dates: [],
  type: '',
  address: '',
  phone: '',

  taskName: '',
  taskDesc: '',
  taskExecutor: '',
  taskResponsible: '',
  taskDates: [],
  taskType: '',

  users: [
    {
      id: 1,
      name: '小明',
      number: '0001',
      department: '有关部门',
    },
    {
      id: 2,
      name: '小吉',
      number: '0002',
      department: '重要部门',
    },
    {
      id: 3,
      name: '张三',
      number: '0003',
      department: '刑事部门',
    },
  ] as User[],
})

const editUserMap = reactive<Record<number, User>>({})
function showUserEdit(user: User) {
  editUserMap[user.id] = {
    ...user,
  }
}

function cancelUserEdit(user: User) {
  delete editUserMap[user.id]
}

function saveUserEdit(user: User) {
  Object.assign(user, editUserMap[user.id])
  cancelUserEdit(user)
}

function deleteUser(index: number) {
  form.value.users.splice(index, 1)
}

function addUser() {
  const user: User = {
    id: Date.now(),
    name: '',
    number: '',
    department: '',
  }
  form.value.users.push(user)
  showUserEdit(user)
}

// 模拟api请求
const { execute: mockSubmitApi, isLoading } = useAsync(() => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
})

const colSpan = {
  xl: 6,
  lg: 8,
  sm: 12,
  xs: 24,
}

</script>

<template>
  <layout-page-header title="高级表单" desc="高级表单常见于一次性输入和提交大批量数据的场景。" />
  <el-form ref="form$" label-position="top" class="space-y-4 m-3">
    <el-card shadow="never" header="仓库管理">
      <el-row :gutter="24">
        <el-col v-bind="colSpan">
          <el-form-item label="仓库名" prop="name">
            <el-input v-model="form.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col v-bind="colSpan">
          <el-form-item label="仓库域名" prop="domain">
            <el-input v-model="form.domain" placeholder="请输入">
              <template #prepend>
                Http://
              </template>
              <template #append>
                .com
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col v-bind="colSpan">
          <el-form-item label="仓库管理员" prop="manager">
            <el-select v-model="form.manager">
              <el-option value="管理员1" />
              <el-option value="管理员2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-bind="colSpan">
          <el-form-item label="审批人" prop="approver">
            <el-select v-model="form.approver">
              <el-option value="审批人1" />
              <el-option value="审批人2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-bind="colSpan">
          <el-form-item label="生效日期" prop="dates">
            <el-date-picker
              v-model="form.dates"
              type="daterange"
              range-separator="到"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
        <el-col v-bind="colSpan">
          <el-form-item label="仓库类型" prop="type">
            <el-select v-model="form.type">
              <el-option value="仓库类型1" />
              <el-option value="仓库类型2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-bind="colSpan">
          <el-form-item label="仓库地址" prop="address">
            <el-input v-model="form.address" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col v-bind="colSpan">
          <el-form-item label="仓库电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <el-card shadow="never" header="任务管理">
      <el-row :gutter="24">
        <el-col v-bind="colSpan">
          <el-form-item label="任务名" prop="taskName">
            <el-input v-model="form.taskName" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col v-bind="colSpan">
          <el-form-item label="任务描述" prop="taskDesc">
            <el-input v-model="form.taskDesc" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col v-bind="colSpan">
          <el-form-item label="执行人" prop="manager">
            <el-select v-model="form.manager">
              <el-option value="执行人1" />
              <el-option value="执行人2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-bind="colSpan">
          <el-form-item label="责任人" prop="taskResponsible">
            <el-select v-model="form.taskResponsible">
              <el-option value="责任人1" />
              <el-option value="责任人2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-bind="colSpan">
          <el-form-item label="生效日期" prop="taskDates">
            <el-date-picker
              v-model="form.taskDates"
              type="daterange"
              range-separator="到"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
        <el-col v-bind="colSpan">
          <el-form-item label="任务类型" prop="taskType">
            <el-select v-model="form.taskType">
              <el-option value="任务类型1" />
              <el-option value="任务类型2" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <el-card shadow="never" header="成员管理">
      <el-table :data="form.users">
        <el-table-column label="成员姓名">
          <template #default="{ row }">
            <el-input v-if="editUserMap[row.id]" :key="`input${row.id}`" v-model="editUserMap[row.id].name" autofocus />
            <template v-else>
              {{ row.name }}
            </template>
          </template>
        </el-table-column>
        <el-table-column label="工号">
          <template #default="{ row }">
            <el-input v-if="editUserMap[row.id]" v-model="editUserMap[row.id].number" />
            <template v-else>
              {{ row.number }}
            </template>
          </template>
        </el-table-column>
        <el-table-column label="所属部门">
          <template #default="{ row }">
            <el-input v-if="editUserMap[row.id]" v-model="editUserMap[row.id].department" />
            <template v-else>
              {{ row.department }}
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ $index, row }">
            <div class="space-x-2">
              <el-link v-if="!editUserMap[row.id]" type="primary" @click="showUserEdit(row)">
                编辑
              </el-link>

              <template v-else>
                <el-link type="primary" @click="saveUserEdit(row)">
                  保存
                </el-link>
                <el-popconfirm title="确认删除?" @confirm="deleteUser($index)">
                  <template #reference>
                    <el-link type="primary">
                      删除
                    </el-link>
                  </template>
                </el-popconfirm>
                <el-link v-if="editUserMap[row.id]" type="primary" @click="cancelUserEdit(row)">
                  取消
                </el-link>
              </template>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="w-full mt-4 border-dashed" @click="addUser">
        <div i-ep-plus />
        添加一行数据
      </el-button>
    </el-card>

    <div class="text-center">
      <el-button type="primary" :loading="isLoading" @click="mockSubmitApi()">
        保存
      </el-button>
      <el-button @click="currentWindow.close()">
        取消
      </el-button>
    </div>
  </el-form>
</template>

<style lang="less" scoped>
.el-form-item {
  :deep(.el-form-item__content) {
    > div {
      flex: 1;
    }
  }
}
</style>

<route lang="yaml">
meta:
  name: 高级表单
</route>
