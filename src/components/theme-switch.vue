<template>
  <el-switch
    v-model="theme"
    style="margin-left: 24px"
    inline-prompt
    :active-icon="Sunny"
    :inactive-icon="Moon"
    @change="toggleDark()"
  />
</template>

<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
import { ref } from 'vue'

const theme = ref<boolean>(false)

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style>

</style>