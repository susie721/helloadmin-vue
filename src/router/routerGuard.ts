import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import { ACCESS_TOKEN, PERMISSION } from '@/store/mutation-types'
import { hasPermission } from './permission'
import { getUserInfo } from '@/store/modules/user'
import permissionStore from '@/store/modules/permission'
import ls from '@/utils/Storage'
import { setDocumentTitle } from '@/utils/domUtil'
import type { Router } from 'vue-router';
import generateAsyncRoutes from './generateAsyncRoutes'
import { notification } from 'ant-design-vue';

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // 不进行拦截的路由名称集合
const defaultRoutePath = '/workplace'
export const setupBeforeEach = (router: Router) => {
    router.beforeEach(async (to, from, next) => {
        NProgress.start() // 加载进度条
        setDocumentTitle(to)
        if (whiteList.includes(to.name as any) || ls.get(ACCESS_TOKEN)) {
            // 在免登录白名单，或者已经登录
            const menu = permissionStore.state.menu;
            // 如果已经有菜单权限，直接进入
            if (menu.length) {
                const permission = ls.get(PERMISSION);
                const canAccess = hasPermission(permission, to);
                if (canAccess) {
                    next();
                    return
                } else {
                    next({ path: '/exception/403' });
                }
            } else {
                if (to.path !== '/user/login') {
                    // 无菜单权限，获取用户信息
                    const userInfo: any = await getUserInfo();
                    if (!userInfo) {
                        next({ path: '/user/login', replace: true });
                        return;
                    }
                    // 生成动态路由
                    const routes = generateAsyncRoutes(permissionStore.state.menu);
                    console.log(permissionStore.state.menu)
                    router.addRoute(routes[0])
                    permissionStore.commit('PERMISSION_ROUTES', routes[0].children)
                    console.log(routes)
                    next({ path: to.path })
                } else {
                    next()
                }
            }
        } else {
            // 未登录，跳转到登录页
            next({ path: '/user/login', query: { redirect: to.fullPath } });
        }
    })

    // 路由懒加载失败时的提示
    router.onError((error) => {
        if (window.env === 'localhost') {
            notification.error({
                message: 'Dynamic import error',
                description: error.stack,
            });
            console.log(error.stack)
        } else {
            router.push({ name: 'error', params: { errorMsg: error.stack } })
        }
    })
}

export const setupAfterEach = (router: Router) => {
    router.afterEach(() => {
        NProgress.done() // finish progress bar
    })
}
