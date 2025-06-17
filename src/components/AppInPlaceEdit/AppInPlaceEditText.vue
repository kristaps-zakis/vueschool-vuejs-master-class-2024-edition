<script setup lang="ts">
const inputValue = defineModel()
defineEmits(['commit'])
</script>

<template>
  <input
    type="text"
    placeholder="Default value"
    class="w-full p-1 bg-transparent focus:outline-none focus:border-none focus:bg-gray-800 focus:rounded-md"
    v-model="inputValue"
    @blur="$emit('commit')"
    @keyup.enter="($event.target as HTMLInputElement).blur()"
  />
</template>
