<template>
  
</template>
<script setup>
import { ref, inject } from 'vue'
const input = ref('')
const addMessage = inject('addMessage')
const send = () => {
  if (input.value.trim()) {
    addMessage({ text: input.value, type: 'user' })
    input.value = ''
  }
}
</script>
<style scoped>
/* 迁移的 input-area 样式 */
</style>
