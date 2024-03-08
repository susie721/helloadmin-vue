import baseService from '@/utils/http/axios'
import { baseURL } from '@/utils/util'
import { API } from './types'

// 创建部门
export const AddDepartment: API._department = data => {
  const api = baseURL + `api/department`
  return baseService.post(api, data)
}

// 编辑部门
export const EditDepartment: API._editDepartment = (id, data) => {
  const api = baseURL + `api/department/${id}`
  return baseService.put(api, data)
}

// 删除部门
export const DeleteDepartment: API._deleteDepartment = (id: number) => {
  const api = baseURL + `api/department/${id}`
  return baseService.delete(api)
}

// 部门列表
export const DepartmentList: API._departmentList = () => {
  const api = baseURL + `api/department`
  return baseService.get(api)
}

// 员工列表
export const UserList: API._userList = (params) => {
  const api = baseURL + `api/user`
  return baseService.get(api, { params })
}
// 员工详情
export const GetUser: API._userInfo = (id) => {
  const api = baseURL + `api/user/${id}`
  return baseService.get(api)
}

// 添加员工
export const AddUser: API._user = data => {
  const api = baseURL + `api/user`
  return baseService.post(api, data)
}

// 编辑部门
export const EditUser: API._editUser = (id, data) => {
  const api = baseURL + `api/department/${id}`
  return baseService.put(api, data)
}

// 删除员工
export const DeleteUser: API._deleteUser = (id: number) => {
  const api = baseURL + `api/user/${id}`
  return baseService.delete(api)
}
