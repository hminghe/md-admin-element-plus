import { type Sort } from 'element-plus/lib/components/table/src/table/defaults'
import { type Ref, computed, ref } from 'vue'

export interface TableBaseResult<T> {
  list: T[]
  total: number
}

export interface useTableOptions {
  defaultPageSize?: number
  defaultSort?: Sort
}

// interface UseTableListReturn<T> extends UsePaginationReturn, UseSortReturn, UseSelectionReturn<T> {
//   data: Ref<TableBaseResult<T>>
//   isLoading: Ref<boolean>
//   refresh: () => void
// }

// 分页
export function usePagination(defaultPageSize = 15) {
  const currentPage = refWithControl(1)
  const pageSize = ref(defaultPageSize)

  return {
    currentPage,
    pageSize,
  }
}

// 排序
export function useSort(defaultSort: Sort = { prop: '', order: 'descending' }) {
  const sort = ref<Sort>({
    ...defaultSort,
  })

  function sortChange({ prop, order }: Sort) {
    sort.value = { prop, order }
  }

  return {
    sort,
    sortChange,
  }
}

// 表格选择
export function useSelection<T>() {
  const selection = ref([]) as Ref<T[]>
  const selectionCount = computed(() => selection.value?.length || 0)
  const selectionChange = (value: T[]) => {
    selection.value = value
  }

  return {
    selection,
    selectionCount,
    selectionChange,
  }
}

export function useTable<Data>(
  getTableData: (query: any) => Promise<TableBaseResult<Data>>,
  searchData: Record<string, any> | Ref<Record<string, any>>,
  {
    defaultPageSize,
    defaultSort,
  }: useTableOptions = {},
) {
  const {
    currentPage,
    pageSize,
  } = usePagination(defaultPageSize)

  const {
    sort,
    sortChange,
  } = useSort(defaultSort)

  const {
    selection,
    selectionCount,
    selectionChange,
  } = useSelection<Data>()

  const { state: data, execute, isLoading } = useAsyncState(
    () => getTableData({
      pageSize: pageSize.value,
      currentPage: currentPage.value,
      sort: sort.value.prop ? sort.value.prop : null,
      sortOrder: sort.value.prop ? sort.value.order : null,
      ...unref(searchData),
    }),
    { list: [], total: 0 },
    { resetOnExecute: false, delay: 1 },
  )

  const fetchData = useDebounceFn(execute, 1)

  // 刷新
  function refresh(page?: number) {
    if (page) {
      currentPage.silentSet(1)
    }
    fetchData()
  }

  watch(() => [pageSize.value, currentPage.value, sort.value, unref(searchData)], () => {
    fetchData()
  })

  return {
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
  }
}
