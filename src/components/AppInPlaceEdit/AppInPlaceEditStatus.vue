<script setup lang="ts">
import type { Database } from '../../../database/types'
type Status = Database['public']['Enums']['current_status']

const inputStatus = defineModel<Status>()

const emit = defineEmits(['commit'])

const { readonly = false } = defineProps<{
  readonly?: boolean
}>()
const toggleStatus = () => {
  if (readonly) return

  inputStatus.value = inputStatus.value === 'completed' ? 'in-progress' : 'completed'
  emit('commit')
}
</script>

<template>
  <div class="text-2xl cursot-pointer" @click="toggleStatus">
    <Transition mode="out-in">
      <iconify-icon
        v-if="inputStatus === 'completed'"
        icon="lucide:circle-check"
        class="text-green-500"
      />
      <iconify-icon v-else icon="lucide:circle-dot" class="text-gray-500" />
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: transform 0.1s;
}

.v-enter-from,
.v-leave-to {
  transform: scale(0.3);
}
</style>
