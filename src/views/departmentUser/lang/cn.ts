import { langType } from './../types'

const lang: langType = {
  modal: {
    createTitle: '创建部门',
    editTitle: '编辑部门'
  },
  form: {
    departmentName: '部门名称',
    superiorDepartment: '上级部门',
    departmentHead: '部门负责人',
    sort: '排序',
    placeholderInput: '请输入',
    placeholderSelect: '请选择',
    validate: {
      department: '部门名称不能为空！',
      superiorDepartment: '请选择上级部门',
      departmentHead: '请选择部门负责人',
    }
  },
  user: {
    name: '员工名称',
    department: '所属部门',
    email: '邮箱',
    role: '角色',
    password: '密码',
    validate: {
      name: '员工名称不能为空！',
      role: '请选择角色',
      password: '密码不能为空！',
      email: '邮箱不能为空！'
    }
  },
  createAt: '创建时间',
  updateAt: '更新时间'
}

export default lang
