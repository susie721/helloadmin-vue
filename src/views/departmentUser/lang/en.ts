import { langType } from './../types'

const lang: langType = {
  modal: {
    createTitle: 'Create Department',
    editTitle: 'Edit Department'
  },
  form: {
    departmentName: 'Department Name',
    superiorDepartment: 'Superior Department',
    departmentHead: 'Department Head',
    sort: 'Sort',
    placeholderInput: 'Please enter',
    placeholderSelect: 'Please Select',
    validate: {
      department: 'Department name cannot be empty!',
      superiorDepartment: 'Please select a superior department!',
      departmentHead: 'Please select the department head!'
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
