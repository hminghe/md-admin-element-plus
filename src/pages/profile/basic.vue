<script lang="ts" setup>
import { ref } from 'vue'
import { type Dict, createTableSummaryMethod, dict2Map, formatAmount, formatNumber } from '@/utils'
import { descriptionsColumn, isDark } from '@/composables'

interface Goods {
  id: number
  name: string
  code: string
  price: number
  num: number
  totalPrice: number
}

const goods = ref<Goods[]>([
  {
    id: 123456,
    name: '矿泉水 550ml',
    code: '12421432143214321',
    price: 2,
    num: 1,
    totalPrice: 2,
  },
  {
    id: 123457,
    name: '凉茶 300ml',
    code: '12421432143214322',
    price: 2,
    num: 2,
    totalPrice: 4,
  },
  {
    id: 123458,
    name: '好吃的薯片',
    code: '12421432143214323',
    price: 2,
    num: 3,
    totalPrice: 6,
  },
  {
    id: 123459,
    name: '特别好吃的蛋卷',
    code: '12421432143214324',
    price: 2,
    num: 4,
    totalPrice: 8,
  },
  {
    id: 123450,
    name: '好吃又退？',
    code: '12421432143214325',
    price: 2,
    num: 5,
    totalPrice: 10,
  },
])

type StatusDict = Dict & { tag?: '' | 'info' | 'success' | 'danger' | 'warning' }
const statusDict: StatusDict[] = [
  {
    value: 1,
    label: '进行中',
    tag: 'info',
  },
  {
    value: 2,
    label: '完成',
    tag: 'success',
  },
  {
    value: 3,
    label: '失败',
    tag: 'danger',
  },
]
const statusMap = dict2Map(statusDict)

const returnProgress = ref([
  {
    time: '2017-10-01 14:10',
    progress: '联系客户',
    status: 1,
    operator: '取货员 ID1234',
    runTime: '5mins',
  },
  {
    time: '2017-10-01 14:10',
    progress: '取货员出发',
    status: 2,
    operator: '取货员 ID1234',
    runTime: '5mins',
  },
  {
    time: '2017-10-01 14:10',
    progress: '取货员接单',
    status: 3,
    operator: '取货员 ID1234',
    runTime: '5mins',
  },
  {
    time: '2017-10-01 14:10',
    progress: '申请审批通过',
    status: 2,
    operator: '取货员 ID1234',
    runTime: '5mins',
  },
  {
    time: '2017-10-01 14:10',
    progress: '发起退货申请',
    status: 2,
    operator: '系统',
    runTime: '1h',
  },
])

const sumColumn = ['price', 'num', 'totalPrice']
const amountColumn = ['price', 'totalPrice']
const goodsSummaryMethod = createTableSummaryMethod<Goods>(sumColumn, amountColumn)

</script>

<template>
  <layout-page-header title="基础详情页" />

  <el-card m-3>
    <el-descriptions title="退款申请" :column="descriptionsColumn">
      <el-descriptions-item label="取货单号:">
        1000000000
      </el-descriptions-item>
      <el-descriptions-item label="状态:">
        已取货
      </el-descriptions-item>
      <el-descriptions-item label="销售单号:">
        1234123421
      </el-descriptions-item>
      <el-descriptions-item label="子订单:">
        3214321432
      </el-descriptions-item>
    </el-descriptions>

    <el-divider />

    <el-descriptions title="用户信息" :column="descriptionsColumn">
      <el-descriptions-item label="用户姓名:">
        付小小
      </el-descriptions-item>
      <el-descriptions-item label="联系电话:">
        18100000000
      </el-descriptions-item>
      <el-descriptions-item label="常用快递:">
        菜鸟仓储
      </el-descriptions-item>
      <el-descriptions-item label="取货地址:">
        浙江省杭州市西湖区万塘路18号
      </el-descriptions-item>
      <el-descriptions-item label="备注:">
        无
      </el-descriptions-item>
    </el-descriptions>
    <el-divider />
    <div class="title">
      退款申请
    </div>
    <el-table
      border
      show-summary
      :data="goods"
      :header-cell-style="isDark ? {} : { background: '#f5f7fa' }"
      :summary-method="goodsSummaryMethod"
    >
      <el-table-column label="商品编号" prop="id" />
      <el-table-column label="商品名称" prop="name" :min-width="90" />
      <el-table-column label="商品条码" prop="code" :min-width="90" />
      <el-table-column label="单价" align="right" prop="price">
        <template #default="{ row }">
          {{ formatAmount(row.price) }}
        </template>
      </el-table-column>
      <el-table-column label="数量(件)" align="right" prop="num" :min-width="100">
        <template #default="{ row }">
          {{ formatNumber(row.num) }}
        </template>
      </el-table-column>
      <el-table-column label="金额" align="right" prop="totalPrice">
        <template #default="{ row }">
          {{ formatAmount(row.totalPrice) }}
        </template>
      </el-table-column>
    </el-table>

    <el-divider />

    <div class="title">
      退货进度
    </div>
    <el-table border :data="returnProgress" :header-cell-style="isDark ? {} : { background: '#f5f7fa' }">
      <el-table-column label="时间" prop="time" />
      <el-table-column label="当前进度" prop="progress" :min-width="90" />
      <el-table-column label="状态" prop="status" :min-width="90">
        <template #default="{ row }">
          <el-tag :type="statusMap[row.status].tag">
            {{ statusMap[row.status].label }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作员ID" prop="operator" />
      <el-table-column label="耗时" prop="runTime" />
    </el-table>
  </el-card>
</template>

<style scoped>
.title {
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 20px;
}
</style>

<route lang="yaml">
meta:
  name: 基础详情页
</route>
