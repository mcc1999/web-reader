<template>
  <div class="page-header">
    <el-avatar
        :size="36"
         class="header-icon"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    <span class="text-large font-600 mr-3"> Web Reader </span>
    <ThemeSwitch />
  </div>
</template>

<script lang="ts" setup>
import ThemeSwitch from '../components/theme-switch.vue'
</script>

<style scoped lang="scss">
.page-header {
  width: 100%;
  height: 50px;
  box-shadow: 0 2px 3px rgb(0 0 0 / 10%);
  display: flex;
  align-items: center;
  
  .header-icon {
    margin: auto 16px;
  }
}
</style>