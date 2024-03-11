import { reactive } from 'vue'
import {
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
                useStorePermission.state.role = role
            },
            [PERMISSION_MENU]: (menu) => {
                useStorePermission.state.menu = menu
            },
            [PERMISSION_ROUTES]: (routes) => {
                useStorePermission.state.routes = routes
            },
            [PERMISSION_ABILITY]: (ability) => {
                useStorePermission.state.ability = ability
            }
        }
        fun[field](type)
    }
}

export default useStorePermission
