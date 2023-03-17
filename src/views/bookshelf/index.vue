<template>
  <div class="bookshelf">
    <div class="shelf-header">
      <div class="title">
        缓存图书
        <el-tooltip placement="bottom">
          <template #content>
            <div style="max-width: 320px;">
              下列展示的图书，以缓存数据的形式保存在浏览器中。由于浏览器会根据系统存储空间的大小，“自动，不定时”清理缓存数据，因此不建议您保存过多数据。
            </div>
          </template>
          <i-ep-question-filled class="question-icon" />
        </el-tooltip>
      </div>
      <div class="upload">
        <UniqueBookName />
        <UploadBook />
      </div>
    </div>
    <div class="book-list">
      <BookItem v-for="book in books" :book="book" :key="book.bookName" />
    </div>
  </div>
  <!-- <Test /> -->
</template>

<script setup lang="ts" >
import UploadBook from '@/components/upload-book.vue';
import UniqueBookName from '@/components/unique-book-name.vue';
import BookItem from '@/components/book-item.vue';
import { useBookStore } from '@/store';
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia'

const bookStore = useBookStore()
const { books } = storeToRefs(bookStore)
onBeforeMount(async () => {
  await bookStore.getLocalBookList()
})

</script>

<style scoped lang="scss">
.bookshelf{
  margin: 0 10%;

  .shelf-header {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 2px solid var(--el-border-color);

    .title{
      display: flex;
      align-items: center;
      color: var(--el-text-color-gray);

    }

    .upload {
      display: flex;
    }
  }
  .book-list {
    display: grid;
    gap: 24px 90px;
    grid-template-columns: repeat(auto-fill, 140px);
    justify-content: center;
    padding: 24px;
  }
}
</style>
