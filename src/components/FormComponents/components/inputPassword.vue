<template>
    <a-input-password style="width: 100%;" v-model:value="modelValue" v-bind="formItem.props" v-on="formItem.eventObject" />
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { FormItem } from '@/types/schema'

export default defineComponent({
    name: 'schema-form-input-password',
    emits: ['update:value'],

    props: {
        formItem: {
            // 表单项
            type: Object as PropType<FormItem>,
            default: () => ({})
        },
        value: undefined as any // 表单项值
    },
    // eslint-disable-next-line
    setup(props, { attrs, emit }) {
        const modelValue = computed({
            get: () => props.value,
            set: (val) => emit('update:value', val)
        })
        return {
            modelValue
        }
    }
})
</script>
