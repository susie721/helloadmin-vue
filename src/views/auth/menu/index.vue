<template>
  <div class="menu">
    <a-flex justify="flex-end" gap="small" class="title">
      <a-button type="primary" @click="openModal">新增</a-button>
    </a-flex>
    <a-table row-key="id" class="table" bordered size="small" :loading="loading" :pagination="false"
      :columns="tableColumns" :dataSource="dataSource">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'type'">
          <a-tag :color="type[text].color">{{ type[text].text }}</a-tag>
        </template>
        <template v-if="column.dataIndex === 'visible'">
          <a-badge :status="status[text].status" :text="status[text].text" />
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a-flex gap="middle">
            <a-button type="link" size="small" @click="edit(record.id)">编辑</a-button>
            <a-button type="link" size="small" danger @click="handleDelete(record.id)">删除</a-button>
          </a-flex>
        </template>
      </template>
    </a-table>
    <Drawer :title="state.title" :open="show" :showFooter="true" :destroyOnClose="true" @onClose="onClose">
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
  </div>
</template>
<script lang="ts" setup name="Menu">
import { computed, ref, reactive, createVNode } from 'vue'
import * as api from './service'
import { usePagination } from 'vue-request'
import { Modal } from 'ant-design-vue';
import { APIParams, Menu } from './types'
import Drawer from '@/components/Drawer/index.vue'
import { getFormSchema } from './form-schema'
import { useMessage } from '@/hooks/useMessage'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import DynamicForm from '@/components/FormComponents/DynamicForm.vue'

const tableColumns = computed(() => [
  {
    dataIndex: 'sort',
    title: '排序',
    width: 90
  },
  {
    dataIndex: 'name',
    title: '菜单名称',
    width: 90
  },
  {
    dataIndex: 'type',
    title: '菜单类型',
    width: 90
  },
  {
    dataIndex: 'path',
    title: '菜单路径',
    width: 90
  },
  {
    dataIndex: 'title',
    title: '菜单标题',
    width: 90
  },
  {
    dataIndex: 'icon',
    title: '菜单图标',
    width: 90
  },
  {
    dataIndex: 'visible',
    title: '是否可见',
    width: 90
  },
  {
    dataIndex: 'component',
    title: '组件路径',
    width: 90
  },
  {
    title: '操作',
    width: 90,
    dataIndex: 'operation',
  },
]);
const type = {
  "D": {
    text: '目录',
    color: '#3b5999'
  },
  "M": {
    text: '菜单',
    color: '#344563'
  },
  "B": {
    text: '按钮',
    color: '#108ee9'
  },
}
const status = {
  'Y': {
    text: '显示',
    status: 'success'
  },
  'N': {
    text: '隐藏',
    status: 'error'
  }
}
const { createMessage } = useMessage()
const show = ref(false);
const state = reactive({
  formSchema: getFormSchema({
    change: (v) => handlerChange(v)
  }),
  stateFields: {
    component: '',
    icon: '',
    name: '',
    parentId: null,
    path: '',
    sort: '',
    title: '',
    type: null,
    visible: 'Y',
  },
  title: ''
})
const formRef = ref<any>(null);
const confirmLoading = ref<boolean>(false);
const isAdd = ref<boolean>(true);
const id = ref<number>(0);
const queryData = (params: APIParams) => {
  return api.MenuList(params);
};
const {
  data,
  loading,
  refresh
} = usePagination(queryData, {
  formatResult: (res: Menu) => res.code === 0 ? res.data.items : [],
})
const dataSource = computed(() => data?.value?.data?.items || []);
// state.formSchema = fields
// console.log(state.formSchema)
// 关闭弹框
const onClose = () => {
  formRef.value.resetFields()
  show.value = false
}

// 显示弹框
const openModal = () => {
  show.value = true
  isAdd.value = true
  state.title = '新增菜单'
  const obj = { ...state.stateFields }
  for (const key in obj) {
    state.stateFields[key] = (key === 'parentId' || key === 'type') ? null : (key === 'visible' ? 'Y' : '')
  }
}

// 处理选择后回调
const handlerChange = (v) => {
  getParentMent(v)
}

// 获取父级菜单
const getParentMent = async (type: string) => {
  const res: any = await api.ParentMent({ type })
  if (res.code === 0) {
    state.formSchema.formItem[1].options = res.data
  }
}

// 编辑
const edit = async (val: number) => {
  state.title = '编辑菜单'
  const res: any = await api.getMenu(val)
  if (res.code === 0) {
    for (const key in state.stateFields) {
      state.stateFields[key] = res.data[key]
    }
  }
  getParentMent(res.data.type)
  show.value = true
  isAdd.value = false
  id.value = val
}

/* 保存 */
const handleSave = () => {
  formRef.value
    .validate()
    .then(async () => {
      const param = formRef.value.modelRef
      confirmLoading.value = true
      const { code } = isAdd.value ? await api.AddMenu(param) : await api.EditMenu(id.value, param)
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

// 删除
const handleDelete = (id: number) => {
  Modal.confirm({
    title: '确定要执行删除操作吗?',
    icon: createVNode(ExclamationCircleOutlined),
    content: '此操作不可逆！',
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      const res = await api.deleteMenu(id)
      if (res.code === 0) {
        createMessage.success('删除成功')
        refresh()
      }
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}
</script>

<style lang="less" scoped>
.menu {
  .table {
    margin-top: 20px;
  }
}
</style>
