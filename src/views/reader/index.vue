<template>
  <!-- Reader -->
  <div id="book-reader" class="reader-content" v-loading="loading"></div>
  <el-empty v-if="!loading && !bookArrayBuffer" description="This Book Does Not Exist!" class="reader-content" />
</template>

<script lang="ts" setup>
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
      height: "100%"
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
.reader-content {
  position: absolute;
  width: 100%;
  height: calc(100% - 51px);
}
</style>