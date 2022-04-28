<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { type Dict, dict2Map } from '@/utils'

import { useAsync, useForm, useTable } from '@/composables'
import { getTableList, tableListDelete } from '@/api/table'

type StatusDict = Dict & { tag?: '' | 'info' | 'success' | 'danger' | 'warning' }
const statusDict: StatusDict[] = [
  { value: 1, label: '关闭', tag: 'info' },
  { value: 2, label: '运行中' },
  { value: 3, label: '已上线', tag: 'success' },
  { value: 4, label: '异常', tag: 'danger' },
]

const statusMap = dict2Map(statusDict)

const searchData = shallowRef({})

const {
  form,
  form$,
  resetFields,
} = useForm({} as Record<string, any>)

const {
  data,
  isLoading,
  refresh,

  currentPage,
  pageSize,

  sort,
  sortChange,

  selection,
  selectionCount,
  selectionChange,
} = useTable(getTableList, searchData)

function search() {
  currentPage.value = 1
  searchData.value = { ...form.value }
}

const { execute: batchDelete, isLoading: batchDeleteLoading } = useAsync(async() => {
  await tableListDelete(selection.value.map(item => item.id))
  ElMessage.success('删除成功')
  refresh()
})

</script>

<template>
  <layout-page-header class="list-table" />
  <div p-3 space-y-2>
    <el-card shadow="never">
      <el-form
        ref="form$"
        m="-b-18px"
        class="-mb-18px"
        label-width="7em"
        :model="form"
      >
        <el-row :gutter="24">
          <el-col :xl="6" :lg="8" :md="12">
            <el-form-item label="规则名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="8" :md="12">
            <el-form-item label="描述" prop="desc">
              <el-input v-model="form.desc" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="8" :md="12">
            <el-form-item label="服务调用次数" prop="count">
              <el-input v-model="form.count" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="8" :md="12">
            <el-form-item label="状态" prop="status">
              <el-select
                v-model="form.status"
                style="width: 100%;"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in statusDict"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="8" :md="12">
            <el-form-item label="上次调度时间" prop="time">
              <el-date-picker
                v-model="form.time"
                style="width: 100%;"
                type="daterange"
                value-format="YYYY-MM-DD"
                start-placeholder="开始时间"
                end-placeholder="结果时间"
              />
            </el-form-item>
          </el-col>

          <el-col
            class="search-buttons"
            text-right
            mb-18px
            :xl="{ span: 6, offset: 12 }"
            :lg="{ span: 8, offset: 0 }"
            :md="{ span: 12, offset: 0 }"
          >
            <el-button type="primary" :loading="isLoading" @click="search">
              查询
            </el-button>
            <el-button type="default" @click="resetFields">
              重置
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card shadow="never" :body-style="{ paddingTop: 0 }">
      <template #header>
        <div
          flex
          my="-8px"
          justify-between
          items-center
        >
          <span>
            查询表格
          </span>
          <div space-x-2>
            <el-button icon="i-ep-plus" type="primary">
              新建
            </el-button>
            <el-button
              icon="i-ep-refresh"
              :disabled="isLoading"
              @click="refresh()"
            />
          </div>
        </div>
      </template>
      <div v-if="selectionCount > 0" my>
        <el-alert type="success" show-icon :closable="false">
          <template #title>
            <flex items-center space-x-2>
              <div>已选择 <strong>{{ selectionCount }}</strong> 项</div>
              <el-popconfirm
                :title="`确认删除 ${selectionCount} 条记录吗？`"
                confirm-button-text="删除"
                confirm-button-type="danger"
                @confirm="batchDelete()"
              >
                <template #reference>
                  <el-link
                    type="danger"
                    size="small"
                    :loading="batchDeleteLoading"
                  >
                    批量删除
                  </el-link>
                </template>
              </el-popconfirm>
            </flex>
          </template>
        </el-alert>
      </div>

      <el-table
        v-loading="isLoading"
        stripe
        :data="data.list"
        :default-sort="sort"
        @sort-change="sortChange"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" />
        <el-table-column label="规则名称" prop="name" />
        <el-table-column label="描述" prop="desc" />
        <el-table-column label="服务调用次数" prop="count" sortable="custom">
          <template #default="{ row }">
            {{ row.count }}万
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="{ row }">
            <el-tag :type="statusMap[row.status].tag" size="small">
              {{ statusMap[row.status].label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="上次调度时间" prop="lastTime" sortable="custom" />
        <el-table-column label="操作" fixed="right" width="130px">
          <template #default="{ row }">
            <el-space>
              <el-link type="primary" @click="$router.push('/profile/advanced?id=' + row.id)">
                配置
              </el-link>
              <el-link type="primary">
                订阅警报
              </el-link>
            </el-space>
          </template>
        </el-table-column>
      </el-table>
      <flex mt justify="end">
        <el-pagination
          v-model:page-size="pageSize"
          v-model:current-page="currentPage"
          background
          layout="total, sizes, prev, pager, next"
          :total="data.total"
          :page-sizes="[10, 15, 20, 30, 40, 50, 100]"
        />
      </flex>
    </el-card>
  </div>
</template>

<route lang="yaml">
meta:
  name: 查询列表
</route>
