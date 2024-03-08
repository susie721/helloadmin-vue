import { reactive } from 'vue'
// import ls from '@/utils/Storage'
import {
  // SITE_PERMISSION,
  PERMISSION_ROLE,
  PERMISSION_MENU,
  PERMISSION_ABILITY,
  PERMISSION_ROUTES
} from '@/store/mutation-types'

const useStorePermission = {
  state: reactive({
    admin: false,
    role: null,
    ability: [],
    menu: [] as MenuDataItem[],
    routes: []
  }),
  commit: (field, type) => {
    const fun = {
      [PERMISSION_ROLE]: (role) => {
        // cache({ [PERMISSION_ROLE]: role })
        useStorePermission.state.role = role
      },
      [PERMISSION_MENU]: (menu) => {
        // cache({ [PERMISSION_ROLE]: menu })
        useStorePermission.state.menu = menu
      },
      [PERMISSION_ROUTES]: (routes) => {
        // cache({ [PERMISSION_ROLE]: menu })
        useStorePermission.state.routes = routes
      },
      [PERMISSION_ABILITY]: (ability) => {
        // cache({ [PERMISSION_ROLE]: ability })
        useStorePermission.state.ability = ability
      }
    }
    fun[field](type)
  }
}
// function cache(o) {
//   ls.setObj(SITE_PERMISSION, o)
// }
export default useStorePermission
