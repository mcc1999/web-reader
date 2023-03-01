<template>
  <div class="toolbar-item">
    <div class="toolbar-item-title">章节</div>
    <el-select size="small" filterable clearable class="select-class" v-model="toc" @change="handleTocChange" placeholder="请选择/搜索">
      <el-option v-for="option in tocOptions" :key="option.label" :label="option.label" :value="option.value" style="max-width: 320px;"/>
    </el-select>
  </div>
</template>

<script setup lang='ts'>
import { useEpubStore } from '@/store';
import { storeToRefs } from 'pinia';

const epubStore = useEpubStore()

const { currentBook: book, rendition } = storeToRefs(epubStore)
const tocOptions = ref()
const toc = ref()

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