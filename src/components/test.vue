<template>
  <!-- <el-tree
    :data="data"
    :props="defaultProps"
    accordion
    @node-click="handleNodeClick"
  /> -->

  <Toc />
</template>

<script lang="ts" setup>
import Toc from '@/components/toc.vue'

interface Tree {
  label: string
  children?: Tree[]
}
</script>
