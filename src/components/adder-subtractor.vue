<template>
  <div class="add-sub-container">
    <div id="sub" class="btn" @click="handelSub">-</div>
    <div>{{ value }}</div>
    <div id="add" class="btn" @click="handelAdd">+</div>
  </div>
</template>

<script setup lang='ts'>
interface AddSubProps<T> {
  value: T;
  options: T[]
  onSub: (val: T) => void; 
  onAdd: (val: T) => void; 
}
const {value, options, onAdd, onSub} = defineProps<AddSubProps<number>>()
const index = ref<number>(options.findIndex(v => v === value))
const handelSub = () => {
  onSub(options[index.value])
}
const handelAdd = () => {
  onAdd(options[index.value])
}
</script>

<style scoped lang='scss'>

</style>