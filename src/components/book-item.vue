<template>
  <div class="book-item">
    <span>{{ props.book.bookName }}</span>
    <div class="delete-icon" @click="handleDeleteBook">
      <i-ep-circle-close-filled />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { Book, useBookStore } from '@/store/book';
import { onMounted } from 'vue';
import { CircleCloseFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';

interface BookItemProps {
  book: Book
}
const props = defineProps<BookItemProps>()
const bookStore = useBookStore()

const handleDeleteBook = async () => {
  bookStore.deleteBook(props.book.bookName).then(() => {
    ElMessage.success('删除图书成功！')
  }).catch((err)=>{
    ElMessage.error('删除图书失败！')
    console.log('[error-删除图书失败]：', err);
    
  })
}

</script>

<style scoped lang='scss'>
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


  .delete-icon{
    width: 19.2px;
    height: 19.2px;
    display: none;
    position: absolute;
    right: -6px;
    top: -8px;
    font-size: 16px;
    border-radius: 50%;
    border: 3px solid var(--el-border-color);
  }
}
</style>