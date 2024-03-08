import { langType } from './../types'

const lang: langType = {
  title: '新建角色',
  editTitle: '编辑角色',
  role: {
    name: '角色名称',
    placeholderName: '请输入角色名称',
    validateMsg: '角色名称不能为空！',
    describe: '描述',
    placeholderDescribe: '请输入描述'
  },
  menu: {
    type: '菜单类型',
    parentId: '父级菜单',
    title: '菜单标题',
    name: '菜单名称',
    component: '组件路径',
    path: '菜单路径',
    icon: '菜单图标',
    visible: '是否可见',
    sort: '排序',
    validate: {
      placeholderType: '请选择菜单类型',
      placeholderParent: '请选择父级菜单',
      placeholderTitle: '请输入菜单标题',
      placeholderName: '请输入菜单名称',
      placeholderComponent: '请输入组件名称',
      placeholderPath: '请输入菜单路径',
      placeholderIcon: '请输入菜单图标',
      placeholderSort: '请输入排序'
    }
  }
}

export default lang
