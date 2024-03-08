export interface langType {
  [key: string]: any
}

export interface Response {
  code?: number
  data: {}
  message?: string
}
export interface APIParams {
  page: number,
  size: number
}
export interface Item {
  name: string,
  leader: number,
  createdAt: string,
  parentId: number,
  updatedAt: string,
  sort: number,
  id: number
}
export interface UserItem {
  email: string,
  deptId: number,
  department: {
    id: number,
    name: string
  },
  role: {
    id: number,
    name: string
  },
  roleId: number,
  nickname: string,
  updatedAt: string,
  createdAt: string,
  userId: number
}

export interface PaginationProp {
  page: number,
  size: number,
  count: number
}

// 部门响应数据
export interface DepartmentData {
  code?: number
  items: Item[],
  pagination?: PaginationProp
  message?: string
}

// 员工响应数据
export interface UserData {
  code?: number
  items: Item[]
  message?: string
}

export module API {
  // 添加部门
  export type _department = (data: {
    name: string,
    leader?: number,
    parentId?: number,
    sort: number
  }) => Promise<Response>

  // 编辑
  export type _editDepartment = (id: number, data: {
    name: string,
    leader?: number,
    parentId?: number,
    sort: number
  }) => Promise<Response>

  // 部门列表
  export type _departmentList = () => Promise<DepartmentData>

  // 删除部门
  export type _deleteDepartment = (id: number) => Promise<Response>

  // 员工列表
  export type _userList = (params: APIParams) => Promise<Response>

  // 员工详情
  export type _userInfo = (id: string) => Promise<UserItem>

  // 添加员工
  export type _user = (data: {
    nickname: string,
    email: string,
    deptId: number,
    roleId: number,
    password: string
  }) => Promise<Response>

  // 编辑员工
  export type _editUser = (id: number, data: {
    nickname: string,
    email: string,
    deptId: number,
    roleId: number,
  }) => Promise<Response>

  // 删除部门
  export type _deleteUser = (id: number) => Promise<Response>
}
