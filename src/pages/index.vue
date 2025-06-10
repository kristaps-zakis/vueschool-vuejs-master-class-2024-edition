<script setup lang="ts">
import { usePageStore } from '@/stores/pages'

usePageStore().pageData.title = 'Homepage'
</script>

<template>
  <div>
    <h1>Sākumlapa</h1>
  </div>
</template>
