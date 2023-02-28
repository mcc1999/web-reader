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
        <div class="back-to-bookshelf" @click="backToBookShelf">
          <el-tooltip placement="bottom" content="返回书架">
            <i-ep-grid />
          </el-tooltip>
        </div>
      </div>

      <div class="toolbar-right">
        <!-- 目录及翻页 -->
        <Toc />
        <el-divider direction="vertical" />
        <!-- 改变阅读器背景色 -->
        <div class="toolbar-item">
          <div class="toolbar-item-title">背景色</div>
          <el-color-picker v-model="bookStyle.backgroundColor" size="small" @change="updateBookStyle" class="color-pick-class" :predefine="predefineColors" />
        </div>
        <el-divider direction="vertical" />
        <!-- 改变阅读器字号 -->
        <div class="toolbar-item">
          <div class="toolbar-item-title">字号</div>
          <el-select v-model="bookStyle.fontSize" size="small" @change="updateBookStyle" class="select-class">
            <el-option v-for="fontSize in fontSizes" :key="fontSize" :label="fontSize + 'px'" :value="fontSize" />
          </el-select>
        </div>
        <el-divider direction="vertical" />
        <!-- 改变阅读器字体 -->
        <div class="toolbar-item">
          <div class="toolbar-item-title">字体</div>
          <el-select v-model="bookStyle.fontFamily" size="small" @change="updateBookStyle" class="select-class">
            <el-option v-for="fontFamily in fontFamilies" :key="fontFamily" :label="fontFamily" :value="fontFamily" />
          </el-select>
        </div>
        <el-divider direction="vertical" />
        <!-- 改变阅读器文字加粗 -->
        <div class="toolbar-item">
          <div class="toolbar-item-title">加粗</div>
          <el-checkbox v-model="bookStyle.fontWeight" @change="updateBookStyle" />
        </div>
        <el-divider direction="vertical" />
        <!-- 改变阅读器行间距 -->
        <div class="toolbar-item">
          <div class="toolbar-item-title">行间距</div>
          <el-slider v-model="bookStyle.lineHeight" :min="0.5" :max="2" :step="0.5" size="small" @change="updateBookStyle" class="slider-class" />
        </div>
        <el-divider direction="vertical" />
        <ThemeSwitch />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import Toc from '@/components/toolbar/toc.vue'
import ThemeSwitch from '@/components/theme-switch.vue'
import { useBookStore } from '@/store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter()
const bookStore = useBookStore()
const {rendition} = storeToRefs(bookStore)
const toolbarFold = ref(false)
const bookStyle = ref<any>({
  backgroundColor: '#ffffff',
  fontSize: 16,
  fontFamily: 'Arial',
  fontWeight: false,
  lineHeight: 1.5
});
const fontSizes = [12, 16, 24, 32, 36, 48, 64, 96];
const fontFamilies = ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia', 'Palatino', 'Garamond'];
const predefineColors = [
  '#fcfcfc',
  '#f9f4e9',
  '#ceeaba',
  '#6d6d6f',
  '#3b403c',
]
const toggleToolbarFold = () => {
  toolbarFold.value = !toolbarFold.value
}
const updateBookStyle = () => {
  if (rendition.value) {
    rendition.value.themes.override('background-color', bookStyle.value.backgroundColor);
    rendition.value.themes.override('font-size', `${bookStyle.value.fontSize}px`);
    rendition.value.themes.override('font-family', bookStyle.value.fontFamily);
    rendition.value.themes.override('font-weight', bookStyle.value.fontWeight ? 'bold' : 'normal');
    rendition.value.themes.override('line-height', bookStyle.value.lineHeight);
  }
}
const backToBookShelf = () => {
  router.push('/bookshelf')
}
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
      width: 64px;
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
