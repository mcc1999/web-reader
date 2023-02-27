<template>
  <ToolBar />
  <div class="reader-box">
    <!-- Reader -->
    <div id="book-reader" class="reader-content" v-loading="loading" style="width: 1000px"></div>
  </div>
  <el-empty v-if="!loading && !bookArrayBuffer" description="This Book Does Not Exist!" class="reader-empty" />
</template>

<script lang="ts" setup>
import ToolBar from '@/components/toolbar.vue'
import { useBookStore } from '@/store';
import { useRoute } from 'vue-router';
import Epub, { Book } from 'epubjs'

const {query: {uuid}} = useRoute()
const booStore = useBookStore()

const loading = ref(true)
const bookArrayBuffer = ref<ArrayBuffer>()

onBeforeMount(async() => {
  bookArrayBuffer.value = await booStore.getLocalBookArrayBuffer(uuid as string)
})

watch(bookArrayBuffer, async () => {
  if(bookArrayBuffer.value){  
    loading.value = false  
    // @ts-ignore
    const book: Book = new Epub(bookArrayBuffer.value)
    const rendition = book.renderTo("book-reader", {
      width: "100%",
      height: "100%",
      allowScriptedContent: true,
    });
    await rendition.display()
    book.ready.then(() => {
      booStore.setEpubBookElements({
        book,
        rendition
      })
    })
  }
})

</script>

<style lang="scss" scoped>
.reader-box {
  position: absolute;
  width: 100%;
  height: calc(100% - 51px);
  overflow-y: scroll;

  .reader-content {
    height: 100%;
    margin: 30px auto;
    box-shadow: 0 2px 7px rgb(0 0 0 / 20%);
  }
}
.reader-empty {
  position: absolute;
  width: 100%;
  height: calc(100% - 51px);
}
</style>