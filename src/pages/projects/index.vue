<script setup lang="ts">
import type { Tables } from '../../../database/types'
import type { ColumnDef } from '@tanstack/vue-table'
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { RouterLink } from 'vue-router'
import { usePageStore } from '@/stores/store'
import { projectsQuery } from '@/utils/supaQueries'
import type { Projects } from '@/utils/supaQueries'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects | null>(null)

const getProjects = async () => {
  const { data, error } = await projectsQuery

  if (error) console.log(error)
  projects.value = data
}

await getProjects()

const columns: ColumnDef<Projects[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-start' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/projects/${row.original.slug}`,
          class: 'text-start font-medium hover:bg-muted block w-full',
        },
        () => row.original.name,
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-start' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'text-start font-medium' }, row.original.status)
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-start font-medium' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-start font-medium' },
        JSON.stringify(row.original.collaborators),
      )
    },
  },
]
</script>

<template>
  <div>
    <h1 class="text-4xl">Projects page</h1>
    <RouterLink to="/">Go to home</RouterLink>

    <DataTable v-if="projects" :columns="columns" :data="projects" />
  </div>
</template>

<style scoped>
@reference "@/assets/globals.css";

:deep(td) {
  @apply p-0;
  background-color: 'red';
}
:deep(td) > * {
  @apply p-4;
}
</style>
