<template>
  <el-upload
    accept=".epub"
    :auto-upload="false"
    :on-change="handleChange"
    :show-file-list="false"
  >
    <template #trigger>
      <el-button color="#ff6525" class="upload-button" round>
        <i-ep-document-add :size="18" class="add-icon" />
        添加本地图书
      </el-button>
    </template>
  </el-upload>
</template>

<script setup lang='ts'>
import { useBookStore } from '@/store';
import { UploadFile } from 'element-plus';

const bookStore = useBookStore()
const handleChange = async (uploadFile: UploadFile) => {
  await bookStore.addBook(uploadFile.name, uploadFile.raw!)
}
</script>

<style scoped lang='scss'>
.upload-button{
  color: var(--el-color-white);

  .add-icon {
    margin-right: 8px;
  }
}
</style>
