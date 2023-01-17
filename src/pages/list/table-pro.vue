<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { defineItems, defineTablePro } from '@vue-plus/element-plus'
import { type Dict } from '@/utils'

import { useAsync } from '@/composables'
import type { TableListResponse } from '@/api/table'
import { getTableList, tableListDelete } from '@/api/table'

import '@vue-plus/element-plus/es/components/VpTablePro/style'

type StatusDict = Dict & { tag: '' | 'info' | 'success' | 'danger' | 'warning' }
const statusDict: StatusDict[] = [
  { value: 1, label: '关闭', tag: 'info' },
  { value: 2, label: '运行中', tag: '' },
  { value: 3, label: '已上线', tag: 'success' },
  { value: 4, label: '异常', tag: 'danger' },
]

const { VpTablePro, table } = defineTablePro<TableListResponse>(({ dict, search, searchDate, sort }) => {
  defineItems([
    ['name', '规则名称', search()],
    ['desc', '描述', search()],
    ['count', '服务调用次数', search(), sort()],
    ['status', '状态', dict(statusDict), search()],
    ['lastTime', '上次调度时间', searchDate(), sort()],
    ['operate', '操作'],
  ])
})

const { execute: batchDelete, isLoading: batchDeleteLoading } = useAsync(async(rows: TableListResponse[]) => {
  await tableListDelete(rows.map(item => item.id))
  ElMessage.success('删除成功')
  table.value?.refresh()
})

</script>

<template>
  <layout-page-header class="list-table" />
  <div p-3 space-y-2>
    <vp-table-pro
      title="TablePro"
      selection
      :api="getTableList"
    >
      <template #buttons="{ isLoading }">
        <el-button icon="i-ep-plus" type="primary">
          新建
        </el-button>
        <el-button
          icon="i-ep-refresh"
          :disabled="isLoading"
          @click="table?.refresh()"
        />
      </template>

      <template #table:before="{ selectionRows, clearSelection }">
        <div v-if="selectionRows.length">
          <el-alert type="success" show-icon :closable="false">
            <template #title>
              <div class="display-flex items-center space-x-2">
                <div>已选择 <strong>{{ selectionRows.length }}</strong> 项</div>
                <el-popconfirm
                  :title="`确认删除 ${selectionRows.length} 条记录吗？`"
                  confirm-button-text="删除"
                  confirm-button-type="danger"
                  @confirm="batchDelete(selectionRows)"
                >
                  <template #reference>
                    <el-link
                      v-loading="batchDeleteLoading"
                      element-loading-background="transparent"
                      type="danger"
                      size="small"
                    >
                      批量删除
                    </el-link>
                  </template>
                </el-popconfirm>
                <el-link size="small" @click="clearSelection">
                  取消选择
                </el-link>
              </div>
            </template>
          </el-alert>
        </div>
      </template>

      <template #item:count="{ row }">
        {{ row.count }}万
      </template>

      <template #item:operate="{ row }">
        <el-space>
          <el-link type="primary" @click="$router.push('/profile/advanced?id=' + row.id)">
            配置
          </el-link>
          <el-link type="primary">
            订阅警报
          </el-link>
        </el-space>
      </template>
    </vp-table-pro>
  </div>
</template>

<route lang="yaml">
meta:
  name: TablePro
</route>
