<template>
  <div class="page-header">
    <div class="header-left-content">
      <el-avatar
          :size="36"
           class="header-icon"
          src="/reader.png"
        />
      <div> Web Reader </div>
    </div>
    <div class="header-right-content">
      <ThemeSwitch />
      <el-button type="primary">Primary</el-button>
      <!-- Todo i18n -->
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeSwitch from '@/components/theme-switch.vue'
</script>

<style scoped lang="scss">
.page-header {
  width: 100%;
  height: 50px;
  box-shadow: 0 2px 3px rgb(0 0 0 / 10%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--el-border-color);
  // padding: 0 16px;
  
  .header-icon {
    margin: auto 16px;
  }
  .header-left-content{
    display: flex;
    margin-left: 16px;
    line-height: 36px;
  }
  .header-right-content{
    display: flex;
    margin-right: 32px;
  }
}
</style>