import baseService from '@/utils/http/axios'
import { baseURL } from '@/utils/util'
import { API } from './types'

// 登录日志列表
export const LoginLogList: API._LoginLogList = (params) => {
    const api = baseURL + `api/record/login`
    return baseService.get(api, { params })
}
