import { computed } from 'vue';
import permission from '@/store/modules/permission'

export default () => {
    const authAbility = computed(() => permission.state.ability)
    const layoutMenu = computed(() => permission.state.menu)
    const routes = computed(() => permission.state.routes)
    return {
        authAbility, layoutMenu, routes
    }
}
