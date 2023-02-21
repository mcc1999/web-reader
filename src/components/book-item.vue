<template>
  <div class="book-item-wrapper">
    <div class="book-item" @click="handleToReader">
      <span>{{ props.book.bookName }}</span>
    </div>
    <div class="delete-icon" @click="handleDeleteBook">
      <i-ep-circle-close-filled />
    </div>
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

const handleDeleteBook = async () => {
  bookStore.deleteBook(props.book.uuid)
}

const handleToReader = () => {
  router.push({path: '/reader', query: {uuid: props.book.uuid}})
}

</script>

<style scoped lang='scss'>
.book-item-wrapper{
  &:hover .delete-icon {
    display: block;
  }

  .book-item{
    width: 140px;
    height: 196px;
    position: relative;
    // display: flex;
    // align-items: center;
    box-shadow: var(--el-box-shadow-book);
    cursor: pointer;  
  }
  .delete-icon{
    width: 19.2px;
    height: 19.2px;
    display: none;
    position: relative;
    left: 125px;
    top: -205px;
    font-size: 16px;
    border-radius: 50%;
    border: 3px solid var(--el-border-color);
    cursor: pointer;  
  }
}
</style>