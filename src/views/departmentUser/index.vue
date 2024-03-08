<template>
  <a-flex :gap="40" class="department_content">
    <div class="department_list">
      <div class="department_title">
        企业组织架构
        <a-button type="text" @click="() => addDepartment()">
          <template #icon>
            <PlusOutlined />
          </template>
          创建部门
        </a-button>
      </div>
      <a-tree v-model:expandedKeys="expandedKeys" :field-names="fieldNames" :blockNode="true" :tree-data="treeData"
        @select="handlerSelect" class="tree">
        <template #title="item">
          <span>{{ item.name }}</span>
          <a-dropdown :trigger="['click']">
            <SettingFilled @click="openChange" />
            <template #overlay>
              <a-menu>
                <a-menu-item key="1" @click="() => addDepartment()">创建子部门</a-menu-item>
                <a-menu-item key="2" @click="() => edit(item)">编辑</a-menu-item>
                <a-menu-item key="3" @click="() => delDepart(item.id)">删除</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-tree>
    </div>
    <div class="role_table">
      <a-flex justify="flex-end" gap="small" class="title">
        <a-button type="primary" @click="openModal">新增员工</a-button>
      </a-flex>
      <a-table row-key="index" bordered size="small" :pagination="pagination" @change="handleTableChange"
        :columns="tableColumns" :dataSource="tableData">
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'department' || column.dataIndex === 'role'">
            <span>{{ text.name }}</span>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <a-flex gap="middle">
              <a-button type="link" size="small" v-auth="'department:edit'" @click="editUser(record.id)">编辑</a-button>
              <a-button type="link" size="small" danger @click="handleDelete(record.id)">删除</a-button>
            </a-flex>
          </template>
        </template>
      </a-table>
    </div>
    <AddAndEditModal :visible="visible" :formSchema="getFormSchema()" :title="state.depTitle" :fields="getInitalState"
      @afterClose="afterClose" :handleOk="handleOk" />
    <Drawer :title="state.title" :open="show" :showFooter="true" @onClose="onClose">
      <DynamicForm ref="formRef" :colNumber="1" :fields="state.stateFields" :form-schema="state.formSchema" />
      <template #footer>
        <a-flex gap="middle" justify="flex-end">
          <a-button>取消</a-button>
          <a-button type="primary" @click="handleSave" :loading="confirmLoading">
            提交
          </a-button>
        </a-flex>
      </template>
    </Drawer>
  </a-flex>
</template>

<script lang="ts" setup name="DepartmentUser">
import { reactive, h, computed, ref, VueElement, createVNode } from 'vue'
import { TableState, TableStateFilters } from 'ant-design-vue/es/table/interface'
import { ItemType, Modal } from 'ant-design-vue'
import Drawer from '@/components/Drawer/index.vue'
import AddAndEditModal from './components/AddAndEditModal.vue'
import { PlusOutlined, SettingFilled } from '@ant-design/icons-vue'
import DynamicForm from '@/components/FormComponents/DynamicForm.vue'
import { useMessage } from '@/hooks/useMessage'
import { usePagination } from 'vue-request'
import { getFormSchema, getUserFormSchema } from './form-schema'
import type { TreeProps } from 'ant-design-vue'
import * as api from './service'
import { Item } from './types'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

type APIParams = {
  page: number;
  size: number;
  [key: string]: any;
};
function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
): ItemType {
  return {
    label,
    key,
    icon
  } as ItemType;
}
const { createMessage } = useMessage()
const activeKey = ref('1')
const visible = ref(false) // 是否显示弹框
const id = ref<string>('')
const show = ref(false)
const isAdd = ref<boolean>(true)
const fieldNames: TreeProps['fieldNames'] = {
  title: 'name',
  key: 'id'
};
const state = reactive({
  formSchema: getUserFormSchema(),
  stateFields: {
    deptId: undefined,
    email: '',
    nickname: '',
    password: null,
    roleId: undefined
  },
  title: '',
  depTitle: ''
})
const tableColumns = computed(() => [
  {
    dataIndex: 'nickname',
    title: '员工名称',
    width: 90
  },
  {
    dataIndex: 'email',
    title: '邮箱',
    width: 120
  },
  {
    dataIndex: 'department',
    title: '所属部门',
    width: 100
  },
  {
    dataIndex: 'role',
    title: '角色',
    width: 120
  },
  {
    dataIndex: 'updatedAt',
    title: '更新时间',
    width: 160
  },
  {
    dataIndex: 'createdAt',
    title: '创建时间',
    width: 160
  },
  {
    title: '操作',
    width: 90,
    dataIndex: 'operation',
  }
]);
const expandedKeys = ref<string[]>([]);
const treeData = ref<TreeProps['treeData']>([])
const formRef = ref<any>(null)
const confirmLoading = ref<boolean>(false)
const items: ItemType[] = reactive([])
const deptId = ref<number | null>(null)

const getInitalState = reactive({
  name: '',
  leader: null,
  parentId: null,
  sort: ''
})

const queryData = (params: APIParams) => {
  return api.UserList(params);
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
  formatResult: (res: Menu) => res.code === 0 ? res.data.items : [],
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'size'
  }
})
const tableData = computed(() => data?.value?.data?.items || [])

const pagination = computed(() => ({
  total: data.value?.data?.pagination.count,
  current: current.value,
  pageSize: pageSize.value
}))

// 关闭弹框
const afterClose = () => {
  visible.value = false
}

// 部门列表
const getDepartmentDatas = async () => {
  const res = await api.DepartmentList()
  if (res.code === 0) {
    treeData.value = res.data.items
  }
}

// 编辑部门
const edit = (item: Item) => {
  state.depTitle = '编辑部门'
  for (const key in getInitalState) {
    getInitalState[key] = item[key]
  }
  id.value = item.id
  visible.value = true
}

// 创建部门
const addDepartment = () => {
  state.depTitle = '创建部门'
  visible.value = true
  id.value = ''
}

// 提交
const handleOk = async (formModel, state) => {
  const res = !id.value ? await api.AddDepartment(formModel) : await api.EditDepartment(id.value, formModel)
  if (res.code === 0) {
    createMessage.success(!id.value ? '创建成功' : '编辑成功')
  }
  visible.value = false
  getDepartmentDatas()
}

// 删除部门
const delDepart = (id: stirng) => {
  Modal.confirm({
    title: '确定要执行删除操作吗?',
    icon: createVNode(ExclamationCircleOutlined),
    content: '此操作不可逆！',
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      const res = await api.DeleteDepartment(id)
      if (res.code === 0) {
        createMessage.success('删除成功')
        getDepartmentDatas()
      }
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

// 删除员工
const handleDelete = (id: stirng) => {
  Modal.confirm({
    title: '确定要执行删除操作吗?',
    icon: createVNode(ExclamationCircleOutlined),
    content: '此操作不可逆！',
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      const res = await api.DeleteUser(id)
      if (res.code === 0) {
        createMessage.success('删除成功')
        refresh()
      }
    },
    onCancel() {
      console.log('Cancel');
    }
  })
}

// 关闭弹框
const onClose = () => {
  show.value = false
}

// 显示弹框
const openModal = () => {
  show.value = true
  isAdd.value = true
  state.title = '新增员工信息'
}

/* 保存 */
const handleSave = () => {
  formRef.value
    .validate()
    .then(async () => {
      const param = formRef.value.modelRef
      confirmLoading.value = true
      const { code } = isAdd.value ? await api.AddUser(param) : await api.EditUser(id.value, param)
      if (code === 0) {
        createMessage.success(!id.value ? '创建成功' : '编辑成功')
        onClose()
        refresh()
      }
      confirmLoading.value = false
    })
    .catch((err) => {
      console.log('error', err)
    })
}

// 编辑
const editUser = async (val: stirng) => {
  const res = await api.GetUser(val)
  state.title = '编辑员工信息'
  if (res.code === 0) {
    state.formSchema.formItem[4].hidden = true
    const obj = { ...state.stateFields }
    delete obj.password
    for (const key in obj) {
      obj[key] = res.data[key]
    }
    state.stateFields = obj
  }
  show.value = true
  isAdd.value = false
  id.value = val
}

// 选择部门回调查询员工
const handlerSelect = (v) => {
  deptId.value = v[0]
  run({ deptId: v[0], page: 1, size: pageSize.value })
}

// 分页变化回调
const handleTableChange = (pag: Pagination, filters: TableStateFilters) => {
  run({
    size: pag!.pageSize!,
    page: pag?.current,
    deptId: deptId.value,
    ...filters,
  })
}

const openChange = (e: Event) => {
  e.stopPropagation();
}

getDepartmentDatas()
</script>

<style lang="less" scoped>
.department_content {
  height: 100%;

  .title {
    margin-bottom: 20px;
  }

  .department_list {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 240px;
    height: 100%;
    padding: 8px;
    overflow: auto;
    background-color: rgba(8, 30, 66, .04);
    border-radius: 3px;

    .department_title {
      padding: 8px 8px 0;
      margin-bottom: 16px;
      color: #42526e;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &:deep(.tree) {
      flex: 1;
      overflow: auto;
      padding: 8px;
      border-radius: 3px;

      .ant-tree-list {
        .ant-tree-treenode {
          width: 100%;
          padding: 8px 0px;
          cursor: pointer;
          border-radius: 3px;

          .anticon-setting {
            display: none;
          }

          .ant-tree-node-selected,
          .ant-tree-node-content-wrapper:hover {
            background: #ebecf0;
          }

          &:hover {
            .anticon-setting {
              display: inline-block;
              margin-left: 15px
            }

            background: #ebecf0;
          }

          &.ant-tree-treenode-selected {
            background: #ebecf0;
          }

          .ant-tree-node-content-wrapper {
            flex: 1;
          }

          .ant-tree-switcher-icon {
            vertical-align: sub;
            font-size: 14px;
          }
        }
      }
    }


    &:deep(.ant-menu-item) {
      .anticon {
        display: none;
      }

      border: 1px solid transparent;
      color: #172b4d;

      &.ant-menu-item-selected,
      &.ant-menu-item-active {
        background-color: #deebff !important;
        border-color: #4c9aff;
      }

      &:hover {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
        background-color: #deebff !important;
        border-color: #4c9aff;

        .anticon {
          display: block;
        }
      }
    }
  }

  .role_table {
    flex: 1;
  }
}
</style>
