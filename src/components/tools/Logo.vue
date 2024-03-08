<template>
    <div class="logo">
        <router-link :to="{ name: routes.length > 0 ? routes[0]?.name : '' }">
            <img src="@/assets/logo.png" alt="" />
            <h1 v-if="showTitle">{{ title }}</h1>
        </router-link>
    </div>
</template>

<script lang="ts" setup name="Logo">
import useSitePermission from '@/store/useSitePermission'

const props = defineProps({
    title: {
        type: String,
        default: 'Hello Admin',
        required: false,
    },
    showTitle: {
        type: Boolean,
        default: true,
        required: false,
    },
})
const { routes }: any = useSitePermission()
</script>
