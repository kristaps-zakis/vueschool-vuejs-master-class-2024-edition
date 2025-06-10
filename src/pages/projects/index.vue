<script setup lang="ts">
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { RouterLink } from 'vue-router'
import { usePageStore } from '@/stores/pages'
import { projectsQuery } from '@/utils/supaQueries'
import type { Projects } from '@/utils/supaQueries'
import { projectsColumns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects | null>(null)

const getProjects = async () => {
  const { data, error, status } = await projectsQuery

  if (error) useErrorStore().setError({ error, customCode: status })
  projects.value = data
}

await getProjects()
</script>

<template>
  <div>
    <h1 class="text-4xl">Projects page</h1>
    <RouterLink to="/">Go to home</RouterLink>

    <DataTable v-if="projects" :columns="projectsColumns" :data="projects" />
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
