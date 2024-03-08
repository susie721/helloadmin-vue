export interface Menu {
  code?: number
  data: {
    items?: any[]
  }
  message?: string
}
export type APIParams = {
  page: number
  size: number
  [key: string]: any
}
export type MenuParams = {
  type: string
}
export module API {
  // 添加菜单
  export type _menu = (data: {
    component: string,
    icon?: string,
    name: string,
    parentId: number,
    path: string,
    sort: number,
    title: string,
    type: string,
    visible: string
  }) => Promise<Menu>
  // 编辑菜单
  export type _editMenu = (id: number, data: {
    component: string,
    icon?: string,
    name: string,
    parentId: number,
    path: string,
    sort: number,
    title: string,
    type: string,
    visible: string
  }) => Promise<Menu>

  // 菜单列表
  export type _MenuList = (params: APIParams) => Promise<Menu>

  // 获取父级菜单
  export type _ParentMent = (params: MenuParams) => Promise<Menu>

  // 菜单信息
  export type _MenuInfo = (id: number) => Promise<Menu>
}
