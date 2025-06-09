<script setup lang="ts">
import AuthLayout from '@/components/Layout/main/AuthLayout.vue'
import { useErrorStore } from '@/stores/error'
import AppErrorPage from './components/AppError/AppErrorPage.vue'
// import { error } from 'console'

const errorStore = useErrorStore()
const { activeError } = storeToRefs(errorStore)

onErrorCaptured((error) => {
  errorStore.setError({ error })
})
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="activeError" />

    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name"></Component>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
