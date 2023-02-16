import { defineStore } from "pinia"

export const useTestStore = defineStore('test', {
  state: () => ({
    counter: 0,
  }),
  actions: {
    increment() {
      console.log('this.counter', this.counter);
      
      this.counter++
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random())
    },
  },
})