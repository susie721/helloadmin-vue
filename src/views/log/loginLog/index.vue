<template>
  <div>
    <a-table row-key="index" bordered size="small" @change="handleTableChange" :pagination="pagination"
      :columns="tableColumns" :dataSource="tableData">
      <template #bodyCell="{ column, text, record }">
        <!-- <template v-if="column.dataIndex === 'department' || column.dataIndex === 'role'">
          <span>{{ text.name }}</span>
        </template> -->
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup name="LoginRecord">
import { reactive, h, computed, ref, VueElement, createVNode } from 'vue'
import { usePagination } from 'vue-request'
import * as api from '../service'
import { Response } from '../types'

type APIParams = {
  page: number;
  size: number;
  [key: string]: any;
}

const tableColumns = computed(() => [
  {
    dataIndex: 'ip',
    title: 'IP',
    width: 120
  },
  {
    dataIndex: 'email',
    title: '邮箱',
    width: 120
  },
  {
    dataIndex: 'browser',
    title: '浏览器',
    width: 120
  },
  {
    dataIndex: 'updatedAt',
    title: '更新时间',
    width: 140
  },
  {
    dataIndex: 'createdAt',
    title: '创建时间',
    width: 140
  }
])

const queryData = (params: APIParams) => {
  return api.LoginLogList(params);
}

const {
  data,
  loading,
  params,
  current,
  pageSize,
  refresh,
  run
} = usePagination(queryData, {
  formatResult: (res) => res.code === 0 ? res.data.items : [],
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'size'
  }
})

const tableData = computed(() => data?.value?.data?.items || [])

const pagination = computed(() => ({
  total: data?.value?.data?.pagination?.count,
  current: current.value,
  pageSize: pageSize.value
}))

// 分页变化回调
const handleTableChange = (pag: Pagination, filters: TableStateFilters) => {
  run({
    size: pag!.pageSize!,
    page: pag?.current,
    deptId: deptId.value,
    ...filters,
  })
}
</script>
