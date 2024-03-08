import type { Ref } from 'vue'
import { ref } from 'vue'
import useSitePermission from '@/store/useSitePermission';
import { isString, isArray, isObject } from 'lodash-es'

export function usePermissions(): {
  permission: Ref<boolean | object>;
  hasPermission: (value: object | string | string[]) => void
} {
  const all_permission = ref('*:*:*')
  const { authAbility } = useSitePermission()
  const permission = ref<object | boolean>({})

  function hasPermission(value: object | string | string[]) {
    if (value && isObject(value) && Object.keys(value).length > 0) {
      Object.keys(value).map(item => {
        let isExist = true
        const permissionFlag = value[item]
        const hasPermissions = authAbility.value.some(el => {
          return all_permission.value === el || permissionFlag.includes(el)
        })
        if (!hasPermissions) {
          isExist = false
        }
        permission.value[item] = isExist
        return item
      })
    } else if (isString(value) || isArray(value)) {
      permission.value = authAbility.value.some(el => {
        return all_permission.value === el || (value as string[]).includes(el)
      })
    }
  }
  return {
    permission,
    hasPermission
  }
}
