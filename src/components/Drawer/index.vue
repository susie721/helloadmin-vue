<template>
  <a-drawer :width="width" :title="title" :placement="placement" :open="open" @close="onClose">
    <slot></slot>
    <template v-if="showFooter" #footer>
      <slot name="footer"></slot>
    </template>
  </a-drawer>
</template>
<script lang="ts" setup name="Drawer">
const props = defineProps({
  width: {
    type: Number,
    required: false,
    default: 500
  },
  title: {
    type: String,
    required: true
  },
  showFooter: {
    type: Boolean,
    required: false,
    default: false
  },
  placement: {
    type: String,
    required: false,
    default: 'right'
  },
  open: {
    type: Boolean,
    required: true,
    default: false
  },
})
const emit = defineEmits(['onClose'])
// 关闭
const onClose = () => {
  emit('onClose');
}
</script>
