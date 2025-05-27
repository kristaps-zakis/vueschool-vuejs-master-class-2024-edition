<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from '../../../database/types'

const projects = ref<Tables<'projects'>[] | null>(null)

;(async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error) console.log(error)
  projects.value = data
})()
</script>

<template>
  <div>
    <h1 class="text-4xl">Projects page</h1>
    <RouterLink to="/">Go to home</RouterLink>

    <ul v-if="projects">
      <li v-for="project in projects" :key="project.id">
        {{ project.name }}
      </li>
    </ul>
  </div>
</template>
v
