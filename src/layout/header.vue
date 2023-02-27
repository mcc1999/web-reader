<template>
  <div class="page-header" v-if="route.path !== '/reader'">
    <div class="header-left-content" @click="backToBookShelf">
      <el-avatar
          :size="36"
           class="header-icon"
          src="/reader.png"
        />
      <div> Web Reader </div>
    </div>
    <div class="header-right-content">
      <ThemeSwitch />
      <!-- Todo i18n -->
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeSwitch from '@/components/theme-switch.vue'
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const backToBookShelf = () => {
  router.push('bookshelf')
}

</script>

<style scoped lang="scss">
.page-header {
  width: 100%;
  height: 50px;
  box-shadow: 0 2px 3px var(--el-border-color);
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
    cursor: pointer;
  }
  .header-right-content{
    display: flex;
    margin-right: 32px;
  }
}
</style>