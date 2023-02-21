<template>
  <div class="page-header">
    <div class="header-left-content" @click="backToBookShelf">
      <el-avatar
          :size="36"
           class="header-icon"
          src="/reader.png"
        />
      <div> Web Reader </div>
    </div>
    <div class="toolbar">
      <i-ep-arrow-left-bold @click="handlePreviewsPage" />
      <i-ep-arrow-right-bold @click="handleNextPage" />
    </div>
    <div class="header-right-content">
      <ThemeSwitch />
      <!-- Todo i18n -->
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeSwitch from '@/components/theme-switch.vue'
import { useBookStore } from '@/store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const bookStore = useBookStore()
const { currentBook, rendition } = storeToRefs(bookStore)
const router = useRouter()

const backToBookShelf = () => {
  router.push('bookshelf')
}
const handlePreviewsPage = () => {
  if(currentBook.value){
    // @ts-ignore
    currentBook.value.package.metadata.direction === "rtl"
    ? rendition.value.next()
    : rendition.value.prev();
  }
}
const handleNextPage = () => {
  if(currentBook.value){    
    // @ts-ignore
    currentBook.value.package.metadata.direction === "rtl"
    ? rendition.value.prev()
    : rendition.value.next();
  }
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