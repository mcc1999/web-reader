<template>
  <div class="book-item">
    《<span>{{ props.book.bookName }}</span>》
  </div>
</template>

<script setup lang='ts'>
import { Book } from '@/store/book';
import { onMounted } from 'vue';

interface BookItemProps {
  'book': Book
}
const props = defineProps<BookItemProps>()
onMounted(() => {
  console.log('book item props', props);
  
})

</script>

<style scoped lang='scss'>
.book-item{
  width: 140px;
  height: 169px;
  white-space: wrap;;
  border: 2px solid var(--el-border-color);
}
</style>