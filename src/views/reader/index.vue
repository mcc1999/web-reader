<template>
  <ToolBar />
  <div class="reader-box" ref="scrollRef">
    <div class="book-page">
      <div class="book-reader-container" id="book-reader-container">
        <div id="book-reader" class="reader-content" v-loading="loading"></div>
        <div class="next-btn">
          <p @click="handlePreviewsPage">上一章节</p>
          <p @click="handleNextPage">下一章节</p>
        </div>
      </div>
    </div>
  </div>
  <el-empty v-if="!loading && !bookArrayBuffer" description="This Book Does Not Exist!" class="reader-empty" />
</template>

<script lang="ts" setup>
import ToolBar from '@/components/toolbar/index.vue'
import { useBookStore, useEpubStore } from '@/store';
import { useRoute } from 'vue-router';
import Epub, { Book } from 'epubjs'
import { storeToRefs } from 'pinia';

const {query: {uuid}} = useRoute()
const bookStore = useBookStore()
const epubStore = useEpubStore()

const loading = ref(true)
// 最外层的box，用于页面上下滚动
const scrollRef = ref<HTMLDivElement>()
const bookArrayBuffer = ref<ArrayBuffer>()
const {currentBook, rendition} = storeToRefs(epubStore)

onBeforeMount(async() => {
  await bookStore.getLocalBookList() // 在reader路由也要拿一下所有booksInfo，不然拿不到location
  bookArrayBuffer.value = await bookStore.getLocalBookArrayBuffer(uuid as string)
})

watch(bookArrayBuffer, async () => {
  if(bookArrayBuffer.value){  
    loading.value = false  
    // @ts-ignore
    const book: Book = new Epub(bookArrayBuffer.value)
    const rendition = book.renderTo("book-reader", {
      manager: "default",
      flow: "scrolled-doc",
      spread: 'none',
      width: "100%",
      allowScriptedContent: true,
    });
    const oldLocation = bookStore.getBookLocation(uuid as string)
    await rendition.display(oldLocation)

    book.ready.then(() => {
      epubStore.setEpubBook(book)
      epubStore.setRendition(rendition)
    })
  }
})

const handlePreviewsPage = () => {
  if(currentBook.value){
    rendition.value.prev().then(() => {
      // 页面回到最上面
      if(scrollRef.value){
        scrollRef.value.scrollTop = 0
      }
    
      // 获取当前页面location，更新toc组件
      // @ts-ignore
      const curToc = epubStore.rendition.currentLocation().start.href
      bookStore.setBookLocation(uuid as string, curToc)
    });
  }
}
const handleNextPage = () => {
  if(currentBook.value){    
    rendition.value.next().then(() => {
      // 页面回到最上面
      if(scrollRef.value){
        scrollRef.value.scrollTop = 0
      }

      // 获取当前页面location，更新toc组件
      // @ts-ignore
      const curToc = epubStore.rendition.currentLocation().start.href
      bookStore.setBookLocation(uuid as string, curToc)
    });



  }
}

// 按键翻页
const keyListener = function(e: KeyboardEvent){  
  // Left Key
  if ((e.keyCode || e.which) == 37) {
    handlePreviewsPage()
  }
  // Right Key
  if ((e.keyCode || e.which) == 39) {
    handleNextPage()
  }
};
onMounted(() => {
  rendition.value?.on("keyup", keyListener);
  document.addEventListener("keyup", keyListener, false);
})

onBeforeUnmount(async () => {  
  // @ts-ignore
  await bookStore.setBookLocation(uuid, epubStore.rendition.currentLocation().start.href)
})

</script>

<style lang="scss" scoped>
.reader-box {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto;

  .book-page {
    width: 1000px;
    margin: 30px auto;
    box-shadow: var(--el-box-shadow-book);
    
    .book-reader-container {
      padding: 96px 48px 200px;
      box-sizing: border-box;
      
      .reader-content {
        min-height: 100vh;
      }

      .next-btn {
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
        border-top: 1px solid var(--el-color-primary);

        p {
          width: 330px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--el-color-primary);
          background-color: hsla(0,0%,95%,.8);
          border-radius: 4px;
          cursor: pointer;
          user-select: none;
        }
      }
    }

  }
}
.reader-empty {
  position: absolute;
  width: 100%;
  height: calc(100% - 51px);
}
</style>