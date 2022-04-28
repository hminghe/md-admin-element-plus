<script lang="ts" setup>
import { ref } from 'vue'

import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { formatAmount, formatNumber } from '../../utils'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  GridComponent,
  TooltipComponent,
])

const tab = ref('销售额')
const dateRange = ref([])

const option1 = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    top: '5%',
    bottom: '15%',
    left: '0',
    right: '0',
  },
  xAxis: {
    type: 'category',
    data: ['1', '2', '3', '4', '5', '6', '7', '1', '2', '3', '4', '5', '6', '7', '1', '2', '3', '4', '5', '6', '7'],
    show: false,
  },
  yAxis: {
    type: 'value',
    show: false,
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      barWidth: '50%',
    },
  ],
})

const option2 = ref({
  tooltip: {
    trigger: 'axis',

  },
  grid: {
    top: '5%',
    bottom: '15%',
    left: '-10px',
    right: '-10px',
  },
  xAxis: {
    type: 'category',
    data: ['1', '2', '3', '4', '5', '6', '7', '1', '2', '3', '4', '5', '6', '7', '1', '2', '3', '4', '5', '6', '7'],
    show: false,
  },
  yAxis: {
    type: 'value',
    show: false,
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130],
      type: 'line',
      smooth: true,
      symbol: 'none',
      areaStyle: {},
      lineStyle: {
        width: 0,
      },
    },
  ],
})

const option4 = ref({
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  },
  grid: {
    left: '5%',
    right: '4%',
    top: '5%',
    bottom: '10%',
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130, 203, 222, 111, 555, 200],
      type: 'bar',
    },
  ],
})
// const currentPage = ref(1)
</script>

<template>
  <div class="p-4 space-y-5">
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <div class="bg-white" p="x6 t4 b2">
        <div class="text-s mb-1 flex">
          <span class="flex-1">总销售额</span>
          <el-tooltip placement="top" content="指标说明">
            <div class="cursor-pointer" i-ep-info-filled />
          </el-tooltip>
        </div>
        <div class="text-3xl">
          ￥{{ formatAmount('99999') }}
        </div>
        <div class="flex items-center h-15 ">
          <span>周同比 12% </span>
          <div i-ep-caret-top class="text-red-500 ml-1" />
          <span class="ml-4">日同比 11% </span>
          <div i-ep-caret-bottom class="text-green-500 ml-1" />
        </div>

        <div border="t-1 gray-200" class="pt-2">
          日销售额 {{ formatAmount('1024') }} 元
        </div>
      </div>

      <div class="bg-white" p="x6 t4 b2">
        <div class="text-s mb-1 flex">
          <span class="flex-1">总销售额</span>
          <el-tooltip placement="top" content="指标说明">
            <div class="cursor-pointer" i-ep-info-filled />
          </el-tooltip>
        </div>
        <div class="text-3xl">
          ￥{{ formatAmount('99999') }}
        </div>
        <v-chart class="h-15" :option="option1" />

        <div border="t-1 gray-200" class="pt-2">
          日销售额 {{ formatAmount('1024') }} 元
        </div>
      </div>

      <div class="bg-white" p="x6 t4 b2">
        <div class="text-s mb-1 flex">
          <span class="flex-1">总销售额</span>
          <el-tooltip placement="top" content="指标说明">
            <div class="cursor-pointer" i-ep-info-filled />
          </el-tooltip>
        </div>
        <div class="text-3xl">
          ￥{{ formatAmount('99999') }}
        </div>
        <v-chart class="h-15" :option="option2" />

        <div border="t-1 gray-200" class="pt-2">
          日销售额 {{ formatAmount('1024') }} 元
        </div>
      </div>

      <div class="bg-white" p="x6 t4 b2">
        <div class="text-s mb-1 flex">
          <span class="flex-1">PV / UV</span>
          <el-tooltip placement="top" content="指标说明">
            <div class="cursor-pointer" i-ep-info-filled />
          </el-tooltip>
        </div>
        <div class="text-3xl">
          {{ formatNumber('6666') }} / {{ formatNumber('666') }}
        </div>
        <div class="flex items-center h-15 ">
          <span>周同比 12% </span>
          <div i-ep-caret-top class="text-red-500 ml-1" />
          <span class="ml-4">日同比 11% </span>
          <div i-ep-caret-bottom class="text-green-500 ml-1" />
        </div>

        <div border="t-1 gray-200" class="pt-2">
          日 {{ formatNumber('333') }} PV
        </div>
      </div>
    </div>

    <el-card shadow="never">
      <template #header>
        <flex class="-my-18px items-center">
          <div class="flex-1">
            <el-tabs v-model="tab" class="tabs-content-none mt-2">
              <el-tab-pane label="销售额" name="销售额" />
              <el-tab-pane label="访问量" name="访问量" />
            </el-tabs>
          </div>
          <div class="hidden sm:block">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="到"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </div>
        </flex>
      </template>

      <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div class="col-span-1 md:col-span-1 lg:col-span-2">
          <v-chart :key="tab" :option="option4" style="height: 300px" />
        </div>
        <div>
          <div class="mb5">
            门店{{ tab }}排名
          </div>
          <div>
            <flex v-for="i in 8" :key="i" class="mt4">
              <span class="text-center mr4 w5 leading-5" :class="i <= 3 ? 'rounded-2/1 bg-black text-white' : ''">{{ i }}</span>
              <span class="flex-1">工专路 {{ i }} 号店</span>
              <span>{{ formatNumber('323234') }}</span>
            </flex>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<route lang="yaml">
meta:
  name: 分析页
</route>
