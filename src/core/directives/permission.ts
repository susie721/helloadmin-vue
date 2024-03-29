import type { App, Directive, DirectiveBinding } from 'vue'

import { usePermissions } from '@/hooks/usePermissions'

function isAuth(el: Element, binding: any) {
    const { permission, hasPermission } = usePermissions()

    const value = binding.value
    if (value) {
        hasPermission(value)
        if (!permission.value) el.parentNode?.removeChild(el)
    }
    return
}

const mounted = (el: Element, binding: DirectiveBinding) => {
    isAuth(el, binding)
}

const authDirective: Directive = {
    mounted
}

export function setupPermissionDirective(app: App) {
    app.directive('auth', authDirective)
}

export default authDirective
