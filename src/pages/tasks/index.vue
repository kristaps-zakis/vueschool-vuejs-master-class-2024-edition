<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { RouterLink } from 'vue-router'
import { usePageStore } from '@/stores/store'
import { tasksWithProjectsQuery } from '@/utils/supaQueries'
import type { TasksWithProjects } from '@/utils/supaQueries'

usePageStore().pageData.title = 'Tasks'

// type TasksWithProjects = Tables<'tasks'> & { projects: Tables<'projects'> }

const tasks = ref<TasksWithProjects | null>(null)

const getTasks = async () => {
  const { data, error } = await tasksWithProjectsQuery

  if (error) {
    console.log(error)
    return
  }

  tasks.value = data
}

await getTasks()

const columns: ColumnDef<TasksWithProjects[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/tasks/${row.original.id}`,
          class: 'text-start font-medium hover:bg-muted block w-full',
        },
        () => row.original.name,
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
    },
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due Date'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('due_date'))
    },
  },
  {
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-left' }, 'Project'),
    cell: ({ row }) => {
      return row.original.projects
        ? h(
            RouterLink,
            {
              to: `/projects/${row.original.projects.slug}`,
              class: 'text-start font-medium hover:bg-muted block w-full',
            },
            () => row.original.projects?.name,
            // () => row.getValue('projects').name,
          )
        : h('div', { class: 'text-left font-medium' }, 'No project')
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        JSON.stringify(row.getValue('collaborators')),
      )
    },
  },
]
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
v
