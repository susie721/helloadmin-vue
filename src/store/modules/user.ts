import { reactive } from 'vue'
import ls from '@/utils/Storage'
import { UserInfo } from '@/services/user'
import userStore from './permission'
import { UserInfoProp } from '@/services/user/types'
import {
  SITE_PERMISSION,
  PERMISSION_USERINFO,
  PERMISSION_MENU,
  ACCESS_TOKEN,
  PERMISSION_ABILITY
} from '@/store/mutation-types'

const useStoreUser = {
  state: reactive({
    user: {} as UserInfoProp
  }),
  commit: (field, type) => {
    const fun = {
      [PERMISSION_USERINFO]: (user) => {
        // cache({ [PERMISSION_USERINFO]: user })
        useStoreUser.state.user = user
      }
    }
    fun[field](type)
  }
}

function cache(o) {
  ls.setObj(SITE_PERMISSION, o)
}
// 获取用户信息
export const getUserInfo = async () => {
  const res = await UserInfo()
  if (res.code === 0) {
    const { menu, user } = res.data
    if (menu && user) {
      const menuDatas: MenuDataItem[] = menu.filter(v => v.type !== 'B')
      const abilityDatas = menu.filter(v => v.type === 'B').map(v => v.path)
      useStoreUser.state.user = user
      userStore.commit(PERMISSION_MENU, menuDatas)
      userStore.commit(PERMISSION_ABILITY, abilityDatas)
    } else {
      return false
    }
    return true
  } else {
    return false
  }
}
// 重置store数据
export const resetPermissions = () => {
  useStoreUser.state.user = {} as UserInfoProp
  ls.set(ACCESS_TOKEN, '')
  userStore.commit(PERMISSION_MENU, [])
  userStore.commit(PERMISSION_ABILITY, [])
}
export default useStoreUser
