<template>
  <div class="counter" :class="{ disabled }" :style="{width: width + 'px'}">
    <button class="minus" :disabled="disabled || disabledFlag.sub" @click="decrement">
      <span>-</span>
    </button>
    <span class="value">{{ modelValue }}{{ unit }}</span>
    <button class="plus" :disabled="disabled || disabledFlag.add" @click="increment">
      <span>+</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Option {
  label: string;
  value: number;
}

interface PropsType {
  modelValue: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  width?: number;
  options?: any[];
  unit?: string;
}

const props = withDefaults(defineProps<PropsType>(), {
  min: 1,
  max: 10,
  step: 1,
  disabled: false,
  width: 120,
});

const {
  modelValue, min, max, step, disabled, width, options, unit,
} = toRefs(props)

const emits = defineEmits(['update:modelValue']);
const disabledFlag = ref({ add: false, sub: false })

const judgeDisable = (val: number) => {
  if (options?.value && options.value.length) {
    if (typeof options.value[0] === 'number') {
      disabledFlag.value.add = val === options.value[options.value.length - 1]
      disabledFlag.value.sub = val === options.value[0]
    } else {
      disabledFlag.value.add = val === (options.value[options.value.length - 1] as Option).value
      disabledFlag.value.sub = val === (options.value[0] as Option).value
    }
  } else {
    disabledFlag.value.add = val >= max.value
    disabledFlag.value.sub = val <= min.value
  }
}
onBeforeMount(() => judgeDisable(modelValue.value))

const increment = () => {
  if (options) {
    const index = options.value?.findIndex((option) => option === modelValue)
    if (index && options.value && index < options.value.length - 1) {
      emits('update:modelValue', options.value[index + 1] as number)
      judgeDisable(options.value[index + 1] as number)
    }
    return
  }
  if (modelValue.value + step.value <= max.value) {
    emits('update:modelValue', modelValue.value + step.value);
    judgeDisable(modelValue.value + step.value)
  } else if (modelValue < max) {
    emits('update:modelValue', max);
    judgeDisable(max.value)
  }
};

const decrement = () => {
  if (options?.value) {
    const index = options.value.findIndex((option) => option === modelValue)
    if (index > 0) {
      emits('update:modelValue', options.value[index - 1])
      judgeDisable(options.value[index - 1] as number)
    }
    return
  }
  if (modelValue.value - step.value >= min.value) {
    emits('update:modelValue', modelValue.value - step.value);
    judgeDisable(modelValue.value - step.value)
  } else if (min < modelValue) {
    emits('update:modelValue', min);
    judgeDisable(max.value)
  }
};

</script>

<style lang="scss" scoped>
.counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border: 1px solid var(--el-border-color);
    border-radius: 24px;
    font-size: 14px;
    cursor: pointer;

    &:hover:not(:disabled),
    &:focus:not(:disabled) {
      border-color: #409eff;
      color: #409eff;
      outline: none;
    }

    &:active:not(:disabled) {
      background-color: #f2f6fc;
    }

    &:disabled {
      cursor: not-allowed;
      color: #c0c4cc;
      border-color: #e4e7ed;
    }
  }

  .value {
    display: inline-block;
    margin: 0 8px;
    text-align: center;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    button:not(:disabled) {
      cursor: not-allowed;
    }

    .value {
      cursor: not-allowed;
    }
  }
}
</style>
