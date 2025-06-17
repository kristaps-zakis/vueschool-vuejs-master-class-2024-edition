<script setup lang="ts">
const inputValue = defineModel<string>({ required: true })
const emit = defineEmits(['commit'])

const oldInputValue = ref(inputValue.value)
watch(inputValue, (newValue, oldValue) => {
  // if (newValue !== oldInputValue.value) {
  //   emit('commit')
  // }
  oldInputValue.value = oldValue
})

const emmitCommit = () => {
  if (inputValue.value !== oldInputValue.value) {
    console.log(inputValue.value, oldInputValue.value)
    emit('commit')
    oldInputValue.value = inputValue.value
  }
}
</script>

<template>
  <textarea
    placeholder="Default value"
    class="w-full p-1 bg-transparent focus:outline-none focus:border-none focus:bg-gray-800 focus:rounded-md"
    v-model="inputValue"
    @blur="emmitCommit"
  ></textarea>
</template>
