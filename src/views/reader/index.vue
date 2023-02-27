<template>
  <ToolBar />
  <div class="reader-box">
    <div class="book-page">
      <div id="book-reader" class="reader-content" v-loading="loading" style="width: 1000px"></div>
    </div>
  </div>
  <el-empty v-if="!loading && !bookArrayBuffer" description="This Book Does Not Exist!" class="reader-empty" />
</template>

<script lang="ts" setup>
import ToolBar from '@/components/toolbar/index.vue'
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
      manager: "default",
      flow: "paginated",
      spread: 'none',
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
  height: 100vh;

  .book-page {
    width: 1000px;
    height: 100%;
    margin: 30px auto;
    box-shadow: 0 2px 7px rgb(0 0 0 / 20%);
    
    .reader-content {
      height: 100%;
      padding: 96px 48px 200px;
    }
  }
}
.reader-empty {
  position: absolute;
  width: 100%;
  height: calc(100% - 51px);
}
</style>