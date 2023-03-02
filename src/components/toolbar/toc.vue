<template>
  <div class="toolbar-item">
    <div class="toolbar-item-title">章节</div>
    <el-select size="small" filterable clearable class="select-class" v-model="toc" @change="handleTocChange" placeholder="请选择/搜索">
      <el-option v-for="option in tocOptions" :key="option.label" :label="option.label" :value="option.value" style="max-width: 320px;"/>
    </el-select>
  </div>
</template>

<script setup lang='ts'>
import { useEpubStore, useBookStore } from '@/store';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const {query: {uuid}} = useRoute()
const epubStore = useEpubStore()
const bookStore = useBookStore()
const { currentBook: book, rendition } = storeToRefs(epubStore)
const tocOptions = ref()
// 当前章节和bookstore里数据双向绑定
const { books: booksInfo } = storeToRefs(bookStore)
const toc = ref(booksInfo.value.find(b => b.uuid === uuid)?.location)

const handleTocChange = () => {
  rendition.value.display(toc.value)
  bookStore.setBookLocation(uuid as string, toc.value!)
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

watch(booksInfo, () => {
  toc.value = bookStore.getBookLocation(uuid as string)
}, {deep: true})

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