import numeral from 'numeral'
import { type TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

export interface Dict {
  value: number | string
  label: string
}
export function dict2Map<T extends Dict>(dictList: T[]): Record<string, T> {
  const map: Record<string, T> = {}
  dictList.forEach((dict) => {
    map[dict.value] = dict
  })

  return map
}

export function formatNumber(value: string | number, format = '0,0'): string {
  return numeral(value).format(format)
}

export function formatAmount(value: string | number, format = '0,0.00'): string {
  return formatNumber(value, format)
}

export function createTableSummaryMethod<T extends Record<string, any>>(sumColumn: string[], amountColumn: string[] = []) {
  return ({ columns, data }: {
    columns: TableColumnCtx<T>[]
    data: T[]
  }) => {
    return columns.map((column, index) => {
      if (index === 0) {
        return '合计'
      }

      if (sumColumn.includes(column.property)) {
        const values = data.map(item => item[column.property])

        const sum = values.reduce((prev, curr) => {
          const value = Number(curr)
          if (!isNaN(value)) {
            return prev + curr
          } else {
            return prev
          }
        }, 0)

        return amountColumn.includes(column.property) ? formatAmount(sum) : formatNumber(sum)
      } else {
        return ''
      }
    })
  }
}
