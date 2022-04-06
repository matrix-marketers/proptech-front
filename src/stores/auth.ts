import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    counter: 0
  }),
  getters: {
    // automatically infers the return type as a number
    doubleCount (state) {
      return state.counter * 2
    },
    // the return type **must** be explicitly set
    doublePlusOne (): number {
      // autocompletion and typings for the whole store ✨
      return this.doubleCount + 1
    }
  }
})
