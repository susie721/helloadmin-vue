<template>
  <a-spin :spinning="state.containerLoading" size="large">
    <a-flex :gap="40" class="role_content">
      <div class="role_list">
        <div class="role_title">
          角色列表
          <a-button type="text" v-auth="'role:add'" @click="() => addRole()">
            <template #icon>
              <PlusOutlined />
            </template>
            创建角色
          </a-button>
        </div>
        <a-menu @select="handlerSelect" v-model:selectedKeys="current" :items="items"></a-menu>
      </div>
      <div class="role_table">
        <a-tabs activeKey="1">
          <template #rightExtra>
            <a-button type="primary" @click="submit" v-auth="'auth:save'">保存</a-button>
          </template>
          <a-tab-pane key="1" tab="角色权限" force-render>
            <a-table row-key="index" bordered size="small" :loading="state.loading" :pagination="false"
              childrenColumnName="routes" :columns="tableColumns" :dataSource="state.tableData">
              <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'directory' && record.directory">
                  <a-checkbox :checked="getChecked(record)" @change="handleCheck(record, 1)">{{
                    record.title
                  }}</a-checkbox>
                </template>
                <template v-if="column.dataIndex === 'menu' && record?.menu?.title">
                  <a-checkbox :checked="getChecked(record?.menu)" @change="handleCheck(record?.menu, 2, record)">{{
                    record?.menu?.title }}
                  </a-checkbox>
                </template>
                <template v-if="column.dataIndex === 'button'">
                  <a-space :size="[8, 16]" wrap style="margin-bottom: 0px; min-width: 88px" v-if="record?.button">
                    <a-checkbox v-for="(v, i) in record?.button" :key="i" :checked="getChecked(v)"
                      @change="handleCheck(v, 3, record)">{{ v?.title }}</a-checkbox>
                  </a-space>
                </template>
              </template>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </div>
      <AddAndEditModal :visible="visible" :title="title" :formSchema="getFormSchema()" :fields="getInitalState"
        @afterClose="afterClose" :handleOk="handleOk" />
    </a-flex>
  </a-spin>
</template>

<script lang="ts" setup name="Role">
import { reactive, h, computed, withDirectives, resolveDirective, ref, VueElement, createVNode } from 'vue';
import { Modal, ItemType } from 'ant-design-vue';
import AddAndEditModal from './components/AddAndEditModal.vue'
import { PlusOutlined, SettingFilled, DeleteFilled, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { useMessage } from '@/hooks/useMessage'
import { getFormSchema } from './form-schema';
import * as api from './service';
import * as Api from '../menu/service'
import type { MenuProps } from 'ant-design-vue';
import { Item } from './types'
import i18n from '@/locales/useI18n'

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
): ItemType {
  return {
    label,
    key,
    icon,
  } as ItemType;
}
const { t } = i18n.global;
const { createMessage } = useMessage()
const visible = ref(false); // 是否显示弹框
const current = ref<string[]>([])
const id = ref<any>('')
const checkedMap = ref(new Map())
const title = ref<string>('');
const state: any = reactive({
  tableData: [],
  lists: [],
  roleId: '',
  containerLoading: false,
  loading: false
});

const items: ItemType[] = reactive([])
const auth = resolveDirective('auth')
const getInitalState = reactive({
  name: ''
})

const tableColumns = computed(() => {
  return [
    {
      dataIndex: 'directory',
      title: '模块权限',
      customCell: (_, index) => {
        if (index > 0 && _.id === state.tableData?.[index - 1].id) {
          return { rowSpan: 0 }
        } else {
          return { rowSpan: state.tableData.filter((v: any) => v?.id === _.id).length }
        }
      }
    },
    {
      title: '页面权限',
      dataIndex: 'menu',
    },
    {
      title: '功能权限',
      dataIndex: 'button'
    }
  ]
})

// 关闭弹框
const afterClose = () => {
  visible.value = false
}
// 查询角色下的权限
const handlerSelect = async (v: any) => {
  state.roleId = v.key
  state.loading = true
  const res: any = await api.RoleInfo(v.key - 0)
  state.loading = false
  if (res.code === 0) {
    const menuId: number[] | null = res.data.menuId;
    getRolesPermissionInfo(menuId)
  }
}
// 角色列表
const getRoleDatas = async () => {
  const res = await api.RoleList()
  if (res.code === 0) {
    items.splice(0)
    for (let i = 0; i <= res.data.items.length - 1; i++) {
      const item: any = res.data.items[i]
      items.push(getItem(item.name, item.id.toString(), () => h('span', {},
        [withDirectives(h(SettingFilled, { onClick: () => editRole(item) }), [[auth, 'role:edit']]),
        withDirectives(h(DeleteFilled, { onClick: () => delRole(item.id) }), [[auth, 'role:delete']])
        ])
      ))
    }
    current.value = items[0]?.key ? [items[0]?.key.toString()] : ['']
    handlerSelect({ key: items[0]?.key })
  }
}

// 权限列表
const getMenuDatas = async () => {
  const res: any = await Api.MenuList({ page: 1, size: 10000 })
  if (res.code === 0) {
    const arr: any = []
    state.lists = res.data.items
    res.data.items.forEach((v) => {
      let item: any = { ...v }
      if (v.type === 'M') {
        item.menu = v
        item.directory = ''
      } else if (v.type === 'D') {
        item.directory = v
      }
      if (v?.children) {
        if (v.type === 'D') {
          v.children.forEach((val) => {
            if (val.visible === 'Y') {
              item.menu = val
              if (val?.children) {
                item.button = val.children
                arr.push(item)
                item = { ...v }
              } else {
                arr.push(item)
                item = { ...v }
              }
            }
          })
        } else {
          item.button = v.children
          arr.push(item)
        }
      } else {
        item.button = []
        arr.push(item)
      }
    })
    state.tableData = arr
  }
}

// 是否选中
const getChecked = (row: any) => {
  return checkedMap.value.get(row?.id) || false
}

// 处理勾选回调
const handleCheck = (row, type, parent?: any) => {
  const checked = checkedMap.value.get(row.id) || false
  checkedMap.value.set(row.id, !checked)
  if (row.parentId === 0) {
    if (row?.children && row?.children.length) {
      row.children.forEach((v) => {
        checkedMap.value.set(v.id, !checked)
        if (v?.children && v.children?.length) {
          v.children.forEach((val) => {
            checkedMap.value.set(val.id, !checked)
          })
        }
      })
    }
  }
  if (type === 2 && row.parentId !== 0) {
    checkedMap.value.set(parent.id, !checked)
    if (row.children) {
      row.children.forEach((r) => {
        checkedMap.value.set(r.id, !checked)
      })
    }
  }
  else if (type === 3) {
    const isChecked = parent.menu.children.some((v) => checkedMap.value.get(v.id))
    checkedMap.value.set(parent.id, isChecked)
    checkedMap.value.set(parent.menu.id, isChecked)
  }
}

// 编辑角色
const editRole = (item: Item) => {
  title.value = t('auth.editTitle')
  for (const key in getInitalState) {
    getInitalState[key] = item[key]
  }
  id.value = item.id
  visible.value = true
}

// 创建角色
const addRole = () => {
  visible.value = true
  id.value = ''
  title.value = t('auth.title')
}

// 删除角色
const delRole = (id: number) => {
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
        getRoleDatas()
      }
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

// 获取指定角色下所有权限
const getRolesPermissionInfo = async (menuId: number[] | null) => {
  checkedMap.value.clear()
  if (menuId) {
    menuId.forEach((v) => {
      checkedMap.value.set(v, true)
    })
  }
}

// 提交权限配置
const submit = async () => {
  if (!state.roleId) return createMessage.error('请选择权限配置对应的角色！')
  state.containerLoading = true
  const selectedData = [] as any
  const traverseTree = (data) => {
    for (let i = 0; i < data.length; i++) {
      const item: any = data[i]
      if (checkedMap.value.get(item.id)) {
        selectedData.push(item.id)
      }
      if (item?.children && item?.children?.length) {
        traverseTree(item.children)
      }
    }
  }
  traverseTree(state.lists)
  // 将选中的数据提交给后端
  const response: any = await api.DeployPermission(state.roleId, {
    menuId: selectedData
  })
  if (response && response.code === 0) {
    createMessage.success('配置成功！')
  }
  state.containerLoading = false
}

// 提交
const handleOk = async (formModel, state) => {
  const res = !id.value ? await api.AddRole(formModel) : await api.EditRole(id.value, formModel)
  if (res.code === 0) {
    createMessage.success(!id.value ? '创建成功' : '编辑成功')
  }
  visible.value = false
  getRoleDatas()
}
getMenuDatas()
getRoleDatas()
</script>

<style lang="less" scoped>
.role_content {
  height: 100%;

  .role_list {
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

    .role_title {
      padding: 8px 8px 0;
      margin-bottom: 16px;
      color: #42526e;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &:deep(.ant-menu-root) {
      flex: 1;
      overflow: auto;
    }

    &:deep(.ant-menu-item) {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;

      .ant-menu-item-icon {
        width: 0px;
        min-width: 0px;
      }

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
        background-color: #deebff !important;
        border-color: #4c9aff;

        .ant-menu-item-icon {
          width: auto;
        }

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
