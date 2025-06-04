<script setup lang="ts">
import AuthLayout from '@/components/Layout/main/AuthLayout.vue'
</script>

<template>
  <AuthLayout>
    <Suspense>
      <RouterView />
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </AuthLayout>
</template>
