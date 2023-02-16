<template>
  <div class="bookshelf">
    <div class="title">缓存图书</div>
    <UploadBook />
  </div>
  <div class="book-list">
    <template v-for="book in books">
      <BookItem :book="book" />
    </template>
  </div>
  <!-- <Test /> -->
</template>

<script setup lang="ts" >
import UploadBook from '@/components/upload-book.vue';
import BookItem from '@/components/book-item.vue';
import Test from '@/components/test.vue';
import { useBookStore, useTestStore } from '@/store';
import { onBeforeMount, onMounted, onUpdated, reactive, ref, watch } from 'vue';
import { storeToRefs } from 'pinia'

const bookStore = useBookStore()
const { books } = storeToRefs(bookStore)

watch(books, () => {
  console.log('watch', books.value);
})
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
.book-list {
  display: flex;
  justify-content: space-between;
}
</style>