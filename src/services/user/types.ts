export type UserInfoProp = {
  createdAt: string;
  department: { id: number, name: string };
  deptId: number;
  email: string;
  id: number;
  nickname: string;
  role: { id: number, name: string };
  roleId: number;
  updatedAt: string;
  userId: string;
}
export interface Response {
  code?: number
  data: {
    menu?: MenuDataItem[],
    user: UserInfoProp
  }
  message?: string
}

export module API {
  // 用户信息
  export type _UserInfo = () => Promise<Response>
}
