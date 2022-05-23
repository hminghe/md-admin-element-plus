<script lang="ts" setup>
import { ref } from 'vue'
import { createTableSummaryMethod, formatAmount, formatNumber } from '@/utils'
import { getCurrentWindow } from '@/components/multi-window'
import { breakpoints, descriptionsColumn } from '@/composables'

interface Goods {
  id: number
  name: string
  code: string
  price: number
  num: number
  totalPrice: number
}

const route = useRoute()

const currentWindow = getCurrentWindow()

const orderId = ref(route.query.id || '1000')

currentWindow?.rename(`单号：${orderId.value}`)

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

const goodsSummaryMethod = createTableSummaryMethod<Goods>(
  ['price', 'num', 'totalPrice'],
  ['price', 'totalPrice'],
)

// 小于sm的
const ltSm = breakpoints.smaller('sm')

const currentTab = ref('detail')
</script>

<template>
  <layout-page-header>
    <flex class="py-4 sm:items-center lt-sm:(space-y-2 flex-col)">
      <div class="text-xl">
        单号：{{ orderId }}
      </div>
      <div class="sm:ml-a">
        <el-button-group>
          <el-button>操作一</el-button>
          <el-button>操作二</el-button>
          <el-button type="primary">
            主要操作
          </el-button>
        </el-button-group>
      </div>
    </flex>

    <flex class="lt-sm:(flex-col-reverse)">
      <el-descriptions class="flex-1" :column="descriptionsColumn">
        <el-descriptions-item label="创建人:">
          1000000000
        </el-descriptions-item>
        <el-descriptions-item label="订购产品:">
          苏打水
        </el-descriptions-item>
        <el-descriptions-item label="创建时间:">
          2017-07-07
        </el-descriptions-item>
        <el-descriptions-item label="关联单据:">
          <el-link>12421</el-link>
        </el-descriptions-item>
        <el-descriptions-item label="生效日期:">
          2017-07-07 ~ 2017-08-08
        </el-descriptions-item>
        <el-descriptions-item label="备注:">
          请于两个工作日内确认
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions direction="vertical" class="summary">
        <el-descriptions-item label="状态" :align="ltSm ? 'left' : 'right'">
          <span>待审批</span>
        </el-descriptions-item>
        <el-descriptions-item label="订单金额" :align="ltSm ? 'left' : 'right'">
          <span>¥ 568.08</span>
        </el-descriptions-item>
      </el-descriptions>
    </flex>

    <el-tabs v-model="currentTab">
      <el-tab-pane label="详情" name="detail" />
      <el-tab-pane label="规则" name="rule" />
    </el-tabs>
  </layout-page-header>

  <div p-3>
    <div v-if="currentTab === 'detail'" class="space-y-4">
      <el-card
        header="流程进度"
        :body-style="ltSm ? 'height: 280px; padding-bottom: 0px' : ''"
      >
        <el-steps
          :active="2"
          :direction="ltSm ? 'vertical' : 'horizontal'"
          align-center
        >
          <el-step title="创建项目" description="曲丽丽(2021-11-21)" />
          <el-step title="部门初审" description="周毛毛" />
          <el-step title="财务复核" />
          <el-step title="完成" />
        </el-steps>
      </el-card>

      <el-card header="用户信息">
        <el-descriptions :column="descriptionsColumn">
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

        <el-descriptions title="信息组" :column="descriptionsColumn">
          <el-descriptions-item label="某某数据:">
            777
          </el-descriptions-item>
          <el-descriptions-item label="该数据更新时间:">
            2021-08-08
          </el-descriptions-item>
          <el-descriptions-item label="某某数据:">
            777
          </el-descriptions-item>
          <el-descriptions-item label="该数据更新时间:">
            2021-08-08
          </el-descriptions-item>
        </el-descriptions>

        <el-descriptions direction="vertical" :column="descriptionsColumn">
          <el-descriptions-item label="信息组">
            <el-descriptions direction="vertical" border>
              <el-descriptions-item label="多层级信息组">
                <el-descriptions title="组1" :column="descriptionsColumn">
                  <el-descriptions-item label="某某数据:">
                    777
                  </el-descriptions-item>
                  <el-descriptions-item label="该数据更新时间:">
                    2021-08-08
                  </el-descriptions-item>
                  <el-descriptions-item label="某某数据:">
                    777
                  </el-descriptions-item>
                  <el-descriptions-item label="该数据更新时间:">
                    2021-08-08
                  </el-descriptions-item>
                </el-descriptions>
                <el-divider />
                <el-descriptions title="组2" :column="descriptionsColumn">
                  <el-descriptions-item label="某某数据:">
                    777
                  </el-descriptions-item>
                  <el-descriptions-item label="该数据更新时间:">
                    2021-08-08
                  </el-descriptions-item>
                  <el-descriptions-item label="某某数据:">
                    777
                  </el-descriptions-item>
                  <el-descriptions-item label="该数据更新时间:">
                    2021-08-08
                  </el-descriptions-item>
                </el-descriptions>
                <el-divider />
                <el-descriptions title="组3" :column="descriptionsColumn">
                  <el-descriptions-item label="某某数据:">
                    777
                  </el-descriptions-item>
                  <el-descriptions-item label="该数据更新时间:">
                    2021-08-08
                  </el-descriptions-item>
                  <el-descriptions-item label="某某数据:">
                    777
                  </el-descriptions-item>
                  <el-descriptions-item label="该数据更新时间:">
                    2021-08-08
                  </el-descriptions-item>
                </el-descriptions>
              </el-descriptions-item>
            </el-descriptions>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>

      <el-card header="用户近半年来电记录">
        <el-empty :image-size="100" />
      </el-card>

      <el-card header="用户退货记录">
        <el-table
          border
          show-summary
          :data="goods"
          :header-cell-style="{ background: '#f5f7fa' }"
          :summary-method="goodsSummaryMethod"
        >
          <el-table-column label="商品编号" prop="id" />
          <el-table-column label="商品名称" prop="name" />
          <el-table-column label="商品条码" prop="code" />
          <el-table-column label="单价" align="right" prop="price">
            <template #default="{ row }">
              {{ formatAmount(row.price) }}
            </template>
          </el-table-column>
          <el-table-column label="数量（件）" align="right" prop="num">
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
      </el-card>
    </div>

    <el-card v-else-if="currentTab === 'rule'" header="规则">
      <el-empty :image-size="100" description="暂无规则" />
    </el-card>
  </div>
</template>

<style scoped lang="less">

.summary {
  min-width: 242px;
  span {
    font-size: 24px;
    color: #333;
    line-height: 1;
  }
}
.title {
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 20px;
}
</style>

<route lang="yaml">
meta:
  name: 高级详情页
</route>
