<template>
  <el-config-provider :locale="zhCn">
    <Header />
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
// @ts-ignore
import en from 'element-plus/dist/locale/en.mjs'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import Header from './layout/header.vue'

</script>


<style scoped>

</style>