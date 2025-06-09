<script setup lang="ts">
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { usePageStore } from '@/stores/store'
import { tasksWithProjectsQuery } from '@/utils/supaQueries'
import type { TasksWithProjects } from '@/utils/supaQueries'
import { tasksColumns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'Tasks'

// type TasksWithProjects = Tables<'tasks'> & { projects: Tables<'projects'> }

const tasks = ref<TasksWithProjects | null>(null)

const getTasks = async () => {
  const { data, error, status } = await tasksWithProjectsQuery

  if (error) {
    useErrorStore().setError({ error, customCode: status })
  }

  tasks.value = data
}

await getTasks()
// hello
// useErrorStore().setError({ error: Error('I am an interesting error'), customCode: 500 })
</script>

<template>
  <DataTable v-if="tasks" :columns="tasksColumns" :data="tasks" />
</template>
