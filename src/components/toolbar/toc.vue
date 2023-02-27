<template>
  <div class="toolbar-item">
    <div class="toolbar-item-title">章节</div>
    <el-select size="small" filterable clearable class="select-class" v-model="toc" @change="handleTocChange">
      <el-option v-for="option in tocOptions" :key="option.label" :label="option.label" :value="option.value" style="max-width: 320px;"/>
    </el-select>
    <i-ep-arrow-left-bold @click="handlePreviewsPage" />
    <i-ep-arrow-right-bold @click="handleNextPage" />
  </div>
</template>

<script setup lang='ts'>
import { useBookStore } from '@/store';
import { storeToRefs } from 'pinia';

const bookStore = useBookStore()

const { currentBook: book, rendition } = storeToRefs(bookStore)
const tocOptions = ref()
const toc = ref()

const handlePreviewsPage = () => {
if(book.value){
  // @ts-ignore
  book.value.package.metadata.direction === "rtl"
  ? rendition.value.next()
  : rendition.value.prev();
}
}
const handleNextPage = () => {
  if(book.value){    
    // @ts-ignore
    book.value.package.metadata.direction === "rtl"
    ? rendition.value.prev()
    : rendition.value.next();
  }
}

const handleTocChange = () => {
  rendition.value.display(toc.value)
}

watch(book, async () => {
  if(book){
    const navigation = await book.value.loaded.navigation
    tocOptions.value = navigation.toc.map(navItem => {
      return {
        label: navItem.label.trim(),
        value: navItem.href
      }
    })
  }
})

</script>

<style scoped lang='scss'>
.toolbar-item {
  display: flex;
  align-items: center;
  cursor: pointer;

  .toolbar-item-title {
    margin-right: 12px;
  }

  .select-class {
      width: 128px;
    }
}
</style>