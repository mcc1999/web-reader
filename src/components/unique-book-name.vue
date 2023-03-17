<template>
  <div class="unique-book-name">
    <el-tooltip placement="top" content="是否允许存在同名的图书">
      图书名唯一：
    </el-tooltip>
    <el-switch v-model="uniqueBookName" inline-prompt active-text="on" inactive-text="off" />
  </div>
</template>

<script setup lang='ts'>
import { useBookStore } from '@/store';
import { storeToRefs } from 'pinia';

const bookStore = useBookStore()
const { uniqueBookNameFlag: uniqueBookName } = storeToRefs(bookStore)

</script>

<style scoped lang='scss'>
.unique-book-name{
  height: 32px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
