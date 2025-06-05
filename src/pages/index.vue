<script setup lang="ts">
import { usePageStore } from '@/stores/store'

usePageStore().pageData.title = 'Homepage'
</script>

<template>
  <div>
    <h1>Sākumlapa</h1>
  </div>
</template>
