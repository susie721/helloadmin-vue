import baseService from '@/utils/http/axios'
import { baseURL } from '@/utils/util'
import { API } from './types'

// 用户信息
export const UserInfo: API._UserInfo = () => {
  const api = baseURL + `api/user/profile`
  return baseService.get(api)
}
