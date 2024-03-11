<template>
    <div class="user-wrapper">
        <div class="content-box">
            <a href="#" target="_blank">
                <span class="action">
                    <QuestionCircleOutlined />
                </span>
            </a>
            <notice-icon class="action" />
            <a-dropdown>
                <span class="action ant-dropdown-link user-dropdown-menu">
                    <a-avatar class="avatar" size="small" :src="'/avatar2.jpeg'" />
                    <span class="nickname">{{ userInfo.nickname }}</span>
                </span>
                <template #overlay>
                    <a-menu class="user-dropdown-menu-wrapper">
                        <!-- <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user" />
              <span>个人中心</span>
            </router-link>
            </a-menu-item>-->
                        <!-- <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting" />
              <span>账户设置</span>
            </router-link>
            </a-menu-item>-->
                        <!-- <a-menu-item key="4" @click="showSystemSetting">
                            <a>
                                <SettingOutlined />
                                <span>{{ $t('tools.userMenu.systemConfig') }}</span>
                            </a>
                        </a-menu-item> -->
                        <a-menu-item key="5" @click="onLockScreen">
                            <a>
                                <LockOutlined />
                                <span>{{ $t('tools.userMenu.lockScreen') }}</span>
                            </a>
                        </a-menu-item>
                        <!-- <a-menu-item key="2" disabled>
              <SettingOutlined />
              <span>{{ $t('tools.userMenu.test') }}</span>
            </a-menu-item>-->
                        <a-menu-divider />
                        <a-menu-item key="3">
                            <a href="javascript:;" @click="handleLogout">
                                <LogoutOutlined />
                                <span>{{ $t('tools.userMenu.logout') }}</span>
                            </a>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
            <!-- <span style="overflow: hidden;display: inline-block;">
                <SelectLang :class="theme" class="action" />
            </span> -->
        </div>
    </div>
</template>

<script lang="ts" setup name="UserMenu">
import NoticeIcon from '@/components/NoticeIcon/index.vue'
import { Modal } from 'ant-design-vue'
import {
    QuestionCircleOutlined,
    LogoutOutlined,
    LockOutlined
} from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import { systemConfig } from '@/store/reactiveState'
// import SelectLang from '@/components/SelectLang'
// import ls from '@/utils/Storage'
import userSiteUser from '@/store/userSiteUser'
import { useRouter } from 'vue-router'
import { clearUserInfo } from '@/utils/util'
import { resetPermissions } from '@/store/modules/user'

// const props = defineProps(['theme'])
const { t } = useI18n()
const router = useRouter()
const { userInfo } = userSiteUser()
const handleLogout = () => {
    Modal.confirm({
        title: t('tools.userMenu.tip'),
        content: t('tools.userMenu.checkLogout'),
        onOk: () => {
            // logout().then((res) => {
            clearUserInfo()
            resetPermissions()
            router.push({ path: '/user/login' })
            // })
        },
        onCancel() { }
    })
}
// const showSystemSetting = () => {
//     systemConfig.commit('SET_SETTING_DRAWER', true)
// }

const onLockScreen = () => {
    systemConfig.commit('SET_LOCK_SCREEN', true)
}
</script>
<style lang="less">
.user-dropdown-menu-wrapper {
    .ant-dropdown-menu-item {
        width: 100% !important;
    }
}
</style>
