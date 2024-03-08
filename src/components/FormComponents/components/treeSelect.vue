<template>
  <a-tree-select popupClassName="tree-select" v-model:value="modelValue" :tree-data="formItem.treeData"
    v-bind="formItem.props" v-on="formItem.eventObject" />
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { FormItem } from '@/types/schema'

export default defineComponent({
  name: 'schema-form-tree-select',
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
<style lang="less">
.tree-select {
  width: 100%;

  .ant-select-tree-node-selected {
    background-color: #ebecf0 !important;
  }

  &:deep(.ant-select-tree-node-selected) {
    background-color: #ebecf0;
  }

  .ant-select-tree-treenode {
    width: 100%;
  }
}
</style>
