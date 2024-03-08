<template>
  <div>
    <a-select popupClassName="select" v-model:value="modelValue" v-bind="formItem.props" allowClear
      v-on="formItem.eventObject">
      <a-select-option v-for="item in formItem.options" :value="item.value" :key="item.value">{{
        item.label
      }}</a-select-option>
    </a-select>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { Select } from 'ant-design-vue'
import { FormItem } from '@/types/schema'

export default defineComponent({
  name: 'schema-form-select',
  emits: ['update:value'],
  components: {
    [Select.name]: Select,
    'a-select-option': Select.Option
  },
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
.select {
  .ant-select-item-option-selected {
    background-color: #ebecf0 !important;
  }
}
</style>
