<template>
  <div class="bookshelf">
    <div class="title">缓存图书</div>
    <UploadBook />
  </div>
</template>

<script setup lang="ts" >
import UploadBook from '@/components/upload-book.vue';
</script>

<style scoped lang="scss">
.bookshelf{
  display: flex;
  justify-content: space-between;
  padding: 16px;
  margin: 0 10%;
  border-bottom: 2px solid var(--el-border-color);

  .title{
    height: 32px;
    line-height: 32px;
    color: var(--el-text-color-gray);
  }
}
</style>