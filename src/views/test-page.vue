<template>
  <div></div>
      <div><AddSub v-model="lineHeight" :width='100' @update-value="update" unit="倍"/></div>
</template>

<script setup lang='ts'>
const lineHeight = ref<number>(9)
const update = (value: number) => {
  lineHeight.value = value
}
</script>

<style scoped lang='scss'>

</style>