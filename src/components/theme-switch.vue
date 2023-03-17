<template>
  <el-switch
    v-model="theme"
    style="margin-left: 24px"
    inline-prompt
    :active-icon="Moon"
    :inactive-icon="Sunny"
    @change="toggleDark()"
  />
</template>

<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDark, useToggle } from '@vueuse/core'
import { ref, watch } from 'vue'

const isDark = useDark()
const theme = ref<boolean>(isDark.value)
const toggleDark = useToggle(isDark)

watch(isDark, () => {
  theme.value = isDark.value
})
</script>

<style>

</style>
