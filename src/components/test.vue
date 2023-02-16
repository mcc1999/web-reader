<template>
<input type="file" 
       id="avatar" name="avatar"
       accept="application/epub"
       @change="handleChange"
       >
</template>
<script lang="ts" setup>import { useBookStore } from '@/store';


const bookStore = useBookStore()
const handleChange = (e: any) => {
  const file = e.target.files[0]
  console.log('uploadFile', file);
  bookStore.addBook(file.name, file)
}

</script>
