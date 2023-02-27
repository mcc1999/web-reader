<template>
  <div class="book-item-wrapper">
    <div class="book-item" @click="handleToReader">
      <img :src="props.book.cover" alt="cover">
      <div class="delete-icon" @click="handleDeleteBook">
        <i-ep-circle-close-filled />
      </div>
    </div>
    <div class="book-name">{{ props.book.bookName }}</div>
  </div>
</template>

<script setup lang='ts'>
import { Book, useBookStore } from '@/store/book';
import { useRouter } from 'vue-router';

interface BookItemProps {
  book: Book
}
const props = defineProps<BookItemProps>()
const router = useRouter()
const bookStore = useBookStore()

const handleDeleteBook = async (evt: MouseEvent) => {
  evt.stopPropagation()
  bookStore.deleteBook(props.book.uuid)
}

const handleToReader = () => {
  router.push({path: '/reader', query: {uuid: props.book.uuid}})
}
</script>

<style scoped lang='scss'>
.book-item-wrapper{
  height: 296px;
  
  .book-item{
    width: 140px;
    height: 196px;
    position: relative;
    // display: flex;
    // align-items: center;
    box-shadow: var(--el-box-shadow-book);
    cursor: pointer;

    &:hover .delete-icon {
      display: block;
    }

    
    img {
      width: 100%;
      height: 100%
    }

    .delete-icon{
      width: 19.2px;
      height: 19.2px;
      display: none;
      position: absolute;
      right: -9.1px;
      top: -9.1px;
      font-size: 16px;
      border-radius: 50%;
      border: 3px solid var(--el-border-color);
      cursor: pointer;  
    }
  }
  .book-name {
    width: 140px;      
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 16px;
  }
}
</style>