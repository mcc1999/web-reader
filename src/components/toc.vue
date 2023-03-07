<template>
  <div :class="['toc-container', {'toc-visible': visible}]">
    <div>
      <el-scrollbar height="100vh" ref="scrollRef">
        <div class="toc-search">
          <el-input
            v-model="search"
            placeholder="Search"
            :suffix-icon="Search"
            @input="handleFilterToc"
          />
        </div>
        <el-divider />
        <el-tree 
          class="toc-tree"
          ref="treeRef"
          node-key="href"
          highlight-current
          check-on-click-node
          default-expand-all
          :data="tocData"
          :props="defaultProps"
          :expand-on-click-node="false"
          :filter-node-method="tocFilter"
          @node-click="handleNodeClick"
        />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useEpubStore, useBookStore } from '@/store';
import { NavItem } from 'epubjs/types/navigation';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { Search } from '@element-plus/icons-vue'

const { visible } = defineProps({
  visible: {
    type: Boolean,
    require: true,
  }
}) 
const {query: {uuid}} = useRoute()
const epubStore = useEpubStore()
const bookStore = useBookStore()
const { currentBook: book, rendition } = storeToRefs(epubStore)
const { books: booksInfo } = storeToRefs(bookStore)
const tocData = ref()
const treeRef = ref()
const search = ref()
const scrollRef = ref()

const defaultProps = {
  children: 'subitems',
  label: 'label',
}

const handleNodeClick = async (data: NavItem) => {
  console.log('handleNodeClick', data)
  await rendition.value.display(data.href)
  bookStore.setBookLocation(uuid as string, data.href!)
}
 
// 搜索章节名
const tocFilter = (value: any, data: any) => {
  if (!value) return true;
    return data.label.indexOf(search.value) !== -1;
}

const handleFilterToc = () => {
  treeRef.value?.filter()
}

const getCurrentTocKey = () => {
  if(treeRef.value){
    console.log('getCurrentTocKey', treeRef.value.getCurrentKey());
    
  }
}

const setCurrentTocKey = () => {
  const curTocKey = bookStore.getBookLocation(uuid as string)
  if(treeRef.value.getCurrentKey() !== curTocKey){
    treeRef.value.setCurrentKey(curTocKey)
  }
}

// 获取key在树型结构里的位置Index，以计算它在章节目录里距离Top的值
// 相当于深度优先遍历，第几个遍历到key这个值
const getCurTocKeyIndex = (tree: NavItem[], key: string) => {
  let index = 0, found = false
  const dfs = (nodeTree: NavItem[], key: string) => {
    for(let i = 0; i < nodeTree.length; i++ ) {
      !found && index++
      if(nodeTree[i].href === key) {
        found = true
        return
      }
      if(nodeTree[i].subitems?.length && !found){
        dfs(nodeTree[i].subitems!, key)
      }
    }
  }
  dfs(tree, key)
  return index
}

watch(book, async () => {  
  if(book){
    const navigation = await book.value.loaded.navigation  
    tocData.value = navigation.toc
    await nextTick(setCurrentTocKey)
    const curTocKey = bookStore.getBookLocation(uuid as string)
    const curTocKeyIndex = getCurTocKeyIndex(navigation.toc, curTocKey!)
    
    scrollRef.value.scrollTo({top: 43 * (curTocKeyIndex - 1) + 81})
  }
})

watch(booksInfo, () => {
  setCurrentTocKey()
}, {deep: true})

</script>

<style lang='scss'>
.toc-slide-enter-active,
.toc-slide-leave-active {
  transition: transform 0.5s;
}

.toc-slide-enter-from,
.toc-slide-leave-to {
  transform: translateX(-100%);
}
.toc-visible {
  width: 320px !important;
}
.toc-container {
  width: 0;
  height: 100vh;
  overflow-y: auto;
  flex-shrink: 0;
  border-right: 2px solid var(--el-border-color);
  transition: all 0.5s;
  // padding-top: 75px;
  
  .toc-search {
    margin: 0 auto;
    margin-top: 75px;
    width: 90%;
  }

  .toc-tree {
    margin-bottom: 50px;

    .is-current > .el-tree-node__content {
      color: var(--el-color-primary);
    }
    .el-tree-node {
      padding-left: 18px;
      .el-tree-node__content:first-of-type {
        border-bottom: 1px solid var(--el-border-color);
        padding: 8px 12px;

      }
      .el-tree-node__content {
        .el-tree-node__expand-icon {
          display: none;
        }
      }

      .el-tree-node__children{
        .el-tree-node:last-of-type {
          border-bottom: none;
          padding-bottom: 0;
        }
      }
    }

  }
}
</style>