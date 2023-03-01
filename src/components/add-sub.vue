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

const {modelValue, min, max, step, disabled, width, options, unit} = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 10,
  },
  step: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 120,
  },
  options: {
    type: Array,
    default: null,
  },
  unit: {
    type: String,
    default: undefined,
  }
});

const emits = defineEmits(['update:modelValue']);
const disabledFlag = ref({add: false, sub : false})

const judgeDisable = (val: number) => {
  console.log('options',options);
  
  if(options){
    if(typeof options[0] === 'number'){
      disabledFlag.value.add = val === options[options.length - 1]
      disabledFlag.value.sub = val === options[0]
    }else {
      disabledFlag.value.add = val === (options[options.length - 1] as Option).value
      disabledFlag.value.sub = val === (options[0] as Option).value
    }
  }else {
    disabledFlag.value.add = val >= max
    disabledFlag.value.sub = val <= min
  }
}
onBeforeMount(() => judgeDisable(modelValue))

const increment = () => {  
  if(options) {
    const index = options.findIndex((option) => option === modelValue)
    if (index < options.length - 1) {
      emits('update:modelValue', options[index + 1] as number)
      judgeDisable(options[index + 1] as number)
    }
    return
  }
  if(modelValue + step <= max) {
    emits('update:modelValue', modelValue + step);
    judgeDisable(modelValue + step)
  }else if(modelValue < max){
    emits('update:modelValue', max);
    judgeDisable(max)
  }
};

const decrement = () => {
  if(options) {
    const index = options.findIndex((option) => option === modelValue)
    if (index > 0) {
      emits('update:modelValue', options[index - 1])
      judgeDisable(options[index - 1] as number)
    }
    return
  }
  if(modelValue - step >= min) {   
    emits('update:modelValue', modelValue - step);
    judgeDisable(modelValue - step)
  }else if(min < modelValue){
    emits('update:modelValue', min);
    judgeDisable(max)
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