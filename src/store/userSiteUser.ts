import { computed } from 'vue';
import useStoreUser from '@/store/modules/user'

export default () => {
    const userInfo = computed(() => useStoreUser.state.user)
    return {
        userInfo
    }
}
