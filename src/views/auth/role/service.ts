import baseService from '@/utils/http/axios'
import { baseURL } from '@/utils/util'
import { API } from './types'
// 创建角色
export const AddRole: API._Role = data => {
    const api = baseURL + `api/role`
    return baseService.post(api, data)
}
// 编辑角色
export const EditRole: API._EditRole = (id, data) => {
    const api = baseURL + `api/role/${id}`
    return baseService.put(api, data)
}
// 角色详情
export const RoleInfo: API._RoleInfo = (id) => {
    const api = baseURL + `api/role/${id}`
    return baseService.get(api)
}

// 删除员工
export const DeleteUser: API._deleteRole = (id: number) => {
    const api = baseURL + `api/role/${id}`
    return baseService.delete(api)
}

// 角色列表
export const RoleList: API._RoleList = () => {
    const api = baseURL + `api/role`
    return baseService.get(api)
}
// 配置权限
export const DeployPermission: API._DeployProp = (id: number, data) => {
    const api = baseURL + `api/role/${id}/menu`
    return baseService.put(api, data)
}
