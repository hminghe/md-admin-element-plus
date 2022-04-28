import { type TableBaseResult } from '@/composables'
import request, { get } from '@/utils/request'

export interface TableListResponse {
  id: number
  name: string
  desc: string
  count: number
  status: number
  lastTime: string
}

export interface TableListRequest {
  name: string
}

export function getTableList(query: TableListRequest): Promise<TableBaseResult<TableListResponse>> {
  return get('/tableList', query)
}

export function tableListDelete(ids: number[]): Promise<void> {
  return request.delete(`/tableList?ids=${ids.join(',')}`)
}
