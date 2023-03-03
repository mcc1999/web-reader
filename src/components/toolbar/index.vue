<template>
  <Transition name="slide">
    <div class="toolbar-unfold" v-if="toolbarFold">
      <el-tooltip placement="bottom" content="展开">
        <i-ep-fold @click="toggleToolbarFold" />
      </el-tooltip>
    </div>
  </Transition>

  <Transition name="slide">
    <div class="toolbar" v-if="!toolbarFold">

      <div class="toolbar-left">
        <!-- 工具栏折叠 -->
        <div class="toolbar-fold">
          <el-tooltip placement="bottom" content="收起">
            <i-ep-fold @click="toggleToolbarFold" />
          </el-tooltip>
        </div>
        <div class="title">Web Reader</div>
        <el-divider direction="vertical" />
        <!-- 返回书架 -->
        <div class="back-to-bookshelf" @click="backToBookShelf">
          <el-tooltip placement="bottom" content="返回书架">
            <i-ep-grid />
          </el-tooltip>
        </div>
        <el-divider direction="vertical" />
        <!-- 阅读器全屏 -->
        <div class="fullscreen" @click="handleFullscreen"  >
          <el-tooltip placement="bottom" content="全屏">
            <i-ant-design-fullscreen-exit-outlined v-if="isFullscreen" />
            <i-ant-design-fullscreen-outlined v-else/>
          </el-tooltip>
        </div>
      </div>

      <div class="toolbar-right">
        <!-- <el-divider direction="vertical" /> -->
        <!-- 目录及翻页 -->
        <Toc />
        <el-divider direction="vertical" />
        <!-- 改变阅读器背景色 -->
        <div class="toolbar-item">
          <div class="toolbar-item-title">背景色</div>
          <el-color-picker v-model="readerConfig.backgroundColor" size="small" @change="updateBookStyle" class="color-pick-class" :predefine="predefineColors" />
        </div>
        <el-divider direction="vertical" />
        <!-- 改变阅读器字号 -->
        <div class="toolbar-item">
          <div class="toolbar-item-title">字号</div>
          <AddSub v-model="readerConfig.fontSize" :width='80' :options="fontSizes" unit="px" @update:modelValue="updateBookStyle"/>
          <!-- <el-select v-model="readerConfig.fontSize" size="small" @change="updateBookStyle" class="select-class">
            <el-option v-for="fontSize in fontSizes" :key="fontSize" :label="fontSize + 'px'" :value="readerConfig.fontSize" />
          </el-select> -->
        </div>
        <el-divider direction="vertical" />
        <!-- 改变阅读器字体 -->
        <div class="toolbar-item">
          <div class="toolbar-item-title">字体</div>
          <el-select v-model="readerConfig.fontFamily" size="small" @change="updateBookStyle" class="select-class">
            <el-option v-for="fontFamily in fontFamilies" :key="fontFamily.value" :label="fontFamily.label" :value="fontFamily.value" />
          </el-select>
        </div>
        <el-divider direction="vertical" />
        <!-- 改变阅读器文字加粗 -->
        <div class="toolbar-item">
          <div class="toolbar-item-title">加粗</div>
          <el-checkbox v-model="readerConfig.fontWeight" @change="updateBookStyle" />
        </div>
        <el-divider direction="vertical" />
        <!-- 改变阅读器行间距 -->
        <div class="toolbar-item">
          <div class="toolbar-item-title">行间距</div>
          <AddSub v-model="readerConfig.lineHeight" :width='80' :options="lineHeights" unit="x" @update:modelValue="updateBookStyle"/>
        </div>
        <el-divider direction="vertical" />
        <ThemeSwitch />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import Toc from '@/components/toolbar/toc.vue'
import AddSub from '@/components/add-sub.vue'
import ThemeSwitch from '@/components/theme-switch.vue'
import { useEpubStore } from '@/store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { fontSizes, fontFamilies, predefineColors, lineHeights } from '@/consts/reader-config';
import screenfull from 'screenfull';

const { parentRef } = defineProps({
  parentRef: {
    type: HTMLElement,
    // required: true,
  }
})
const router = useRouter()
const epubStore = useEpubStore()
const {rendition} = storeToRefs(epubStore)
const toolbarFold = ref(false)
const isFullscreen = ref(false)
const { readerConfig } = storeToRefs(epubStore)

const toggleToolbarFold = () => {
  toolbarFold.value = !toolbarFold.value
}
const updateBookStyle = () => {  
  if (rendition.value) {
    rendition.value.themes.override('background-color', readerConfig.value.backgroundColor);
    rendition.value.themes.override('font-size', `${readerConfig.value.fontSize}px`);
    rendition.value.themes.override('font-family', readerConfig.value.fontFamily);
    rendition.value.themes.override('font-weight', readerConfig.value.fontWeight ? 'bold' : 'normal');
    rendition.value.themes.override('line-height', readerConfig.value.lineHeight.toString());
  }
}
const backToBookShelf = () => {
  router.push('/bookshelf')
}

const handleFullscreen = async () => {
	if (screenfull.isEnabled) {
		await screenfull.toggle(parentRef);
	}
}
screenfull.on('change', () => {  
  isFullscreen.value = screenfull.isFullscreen
})

// 页面初始化时，从localStorage获取持久化的readerConfig，并执行一次updateBookStyle
watch(rendition, () => {
  if(rendition.value) {
    updateBookStyle()
    document.getElementById('book-reader-container')?.setAttribute('style', `background-color:${readerConfig.value.backgroundColor}`)
  }
})

watch(() => readerConfig.value.backgroundColor, () => {
  document.getElementById('book-reader-container')?.setAttribute('style', `background-color:${readerConfig.value.backgroundColor}`)
})
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
}

.toolbar {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color);
  position: absolute;
  top: 0;
  left: 0;
  right: 0; 
  z-index: 100;

  .toolbar-left {
    display: flex;
    align-items: center;

    .toolbar-fold{
      width: 54px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      transform: rotate(90deg);
      cursor: pointer;  
    }
    .title {
      font-size: 20px;
      font-weight: 700;
      color: var(--el-color-primary);
    }
    .back-to-bookshelf {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .fullscreen {
      display: flex;
      align-items: center;
      font-size: 16px;
      cursor: pointer;
    }
  }
  .toolbar-right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 24px;
    font-size: 12px;

    .toolbar-item {
      display: flex;
      align-items: center;

      .toolbar-item-title {
        margin-right: 12px;
      }
    }

    .select-class {
      width: 80px;
    }
    
    .slider-class {
      width: 96px;
    }

  }

}
.toolbar-unfold {
  width: 54px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 100;
  box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px;

  svg {
    transform: rotate(-90deg);
  }
}
</style>
