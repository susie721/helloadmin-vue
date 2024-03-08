<template>
  <a-modal v-bind="$attrs" :title="title" defaultShadow="none" :open="visible" :confirm-loading="confirmLoading"
    @cancel="afterClose" @ok="onOk" :closable="false" destroyOnClose :keyboard="false" width="500px">
    <DynamicForm ref="formRef" :colNumber="1" :fields="state.stateFields" :form-schema="state.formSchema" />
  </a-modal>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, PropType } from 'vue'
// import * as api from '../service'
// import { separator } from '@/utils/util'
// import { useMessage } from '@/hooks/useMessage'
// import { UpdateUserLabel, UserInfo } from '../types'
import { FormSchema } from '@/types/schema'
import DynamicForm from '@/components/FormComponents/DynamicForm.vue'

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: false
    },
    formSchema: {
      // 表单项
      type: Object as PropType<FormSchema>,
      default: () => ({})
    },
    fields: {
      // 默认值，一般编辑时传入
      type: Object,
      default: () => ({})
    },
    handleOk: {
      // 点击确定
      type: Function
    }
  },
  components: {
    DynamicForm
  },
  setup(props, { emit }) {
    const loading = ref(false)
    const formRef = ref<any>(null)
    const formModel = ref({ select: undefined, input: undefined })
    const state = reactive({
      formSchema: props.formSchema,
      stateFields: props.fields,
    })

    const confirmLoading = ref(false)
    // 提交
    const onOk = async () => {
      confirmLoading.value = true;
      formRef.value
        .validate()
        .then(async () => {
          await (props.handleOk && props.handleOk(formRef.value.modelRef, state)).finally(
            () => (confirmLoading.value = false)
          )
        })
        .catch(_ => {
          confirmLoading.value = false
        })
    }
    // 关闭弹框
    const afterClose = () => {
      emit('afterClose')
    }
    return {
      afterClose,
      state,
      formModel,
      confirmLoading,
      formRef,
      onOk,
      loading
    }
  }
})
</script>

<style>
</style>
