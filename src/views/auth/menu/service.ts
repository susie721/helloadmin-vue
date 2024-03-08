import baseService from '@/utils/http/axios'
import { baseURL } from '@/utils/util'
import { API, APIParams } from './types'

// 创建菜单
export const AddMenu: API._menu = data => {
    const api = baseURL + `api/menu`
    return baseService.post(api, data)
}
// 获取菜单详情
export const getMenu: API._MenuInfo = (id: number) => {
    const api = baseURL + `api/menu/${id}`
    return baseService.get(api)
}

// // 编辑角色
export const EditMenu: API._editMenu = (id, data) => {
    const api = baseURL + `api/menu/${id}`
    return baseService.put(api, data)
}

// 获取父级菜单
export const ParentMent: API._ParentMent = (params) => {
    const api = baseURL + `api/menu/option`
    return baseService.get(api, { params })
}
// 菜单列表
export const MenuList: API._MenuList = (params) => {
    const api = baseURL + `api/menu`
    return baseService.get(api, { params })
}
// 删除菜单
export const deleteMenu: API._MenuInfo = (id: number) => {
    const api = baseURL + `api/menu/${id}`
    return baseService.delete(api)
}
