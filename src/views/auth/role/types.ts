export interface Role {
  code?: number
  data: {}
  message?: string
}

export interface Item {
  name: string,
  describe: string,
  createdAt: string,
  id: number,
  updatedAt: string,
  menuId: number[] | null
}
// 角色响应数据
export interface RoleData {
  code?: number
  data: {
    items: Item[]
  },
  message?: string
}

export module API {

  // 添加角色
  export type _Role = (data: {
    name: string,
    describe: string
  }) => Promise<Role>
  // 添加角色
  export type _EditRole = (id: number, data: {
    name: string,
    describe: string
  }) => Promise<Role>

  // 角色列表
  export type _RoleList = () => Promise<RoleData>

  // 角色详情
  export type _RoleInfo = (id: number) => Promise<Role>

  // 配置权限
  export type _DeployProp = (id: number, data: {
    menuId: number[]
  }) => Promise<Role>

  // 删除角色
  export type _deleteRole = (id: number) => Promise<RoleData>
}
