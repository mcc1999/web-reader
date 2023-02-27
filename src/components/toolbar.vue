<template>
    <div class="toolbar" v-if="route.path === '/reader'">
      <i-ep-arrow-left-bold @click="handlePreviewsPage" />
      <i-ep-arrow-right-bold @click="handleNextPage" />
    </div>
</template>

<script setup lang='ts'>
import { useBookStore } from '@/store';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const route = useRoute()
const bookStore = useBookStore()

const { currentBook, rendition } = storeToRefs(bookStore)

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

<style scoped lang='scss'>
.toolbar {
  width: 100%;
  height: 50px;
  box-shadow: 0 2px 3px var(--el-border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--el-border-color);
}
</style>