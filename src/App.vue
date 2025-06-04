<script setup lang="ts">
import AuthLayout from '@/components/Layout/main/AuthLayout.vue'

// const MockComponent = defineComponent(async () => {
//   const greeting = ref('Hello, World!')

//   await new Promise((resolve) => {
//     greeting.value = 'Hello, World! (from async component)'

//     setTimeout(() => {
//       resolve(true)
//     }, 1000)
//   })
//   return () => h('div', greeting.value)
// })
</script>

<template>
  <AuthLayout>
    <Suspense>
      <!-- <MockComponent /> -->
      <RouterView />
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </AuthLayout>
</template>
