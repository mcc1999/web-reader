<template>
  <el-button color="#ff6525" class="upload-button" round>
    <el-icon class="add-icon" :size="18"><DocumentAdd /></el-icon>
    添加本地图书
  </el-button>
</template>

<script setup lang='ts'>
import { DocumentAdd } from '@element-plus/icons-vue'

</script>

<style scoped lang='scss'>
.upload-button{
  color: var(--el-color-white);

  .add-icon {
    margin-right: 8px;
  }
}
</style>