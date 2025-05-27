<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from '../../../database/types'

const tasks = ref<Tables<'tasks'>[] | null>(null)

;(async () => {
  const { data, error } = await supabase.from('tasks').select()

  if (error) {
    console.log(error)
    return
  }

  tasks.value = data
})()
</script>

<template>
  <div>
    <h1>Tasks page</h1>
    <RouterLink to="/">Go to home</RouterLink>

    <ul v-if="tasks">
      <li v-for="task in tasks" :key="task.id">
        {{ task.name }}
      </li>
    </ul>
  </div>
</template>
v
