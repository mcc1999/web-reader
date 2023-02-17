<template>
  <el-button @click="()=>ElMessage('message')">message</el-button>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
const r = ref(5)
</script>
