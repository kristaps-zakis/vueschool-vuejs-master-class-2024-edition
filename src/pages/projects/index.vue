<script setup lang="ts">
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { usePageStore } from '@/stores/pages'
import { projectsColumns } from '@/utils/tableColumns/projectsColumns'
import { useProjectStore } from '@/stores/loaders/projects'
import { useCollabs } from '@/composables/collabs'

usePageStore().pageData.title = 'Projects'

const projectsLoader = useProjectStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

await getProjects()

const { getGroupedCollabs, groupedCollabs } = useCollabs()

await getGroupedCollabs(projects.value)

const columnsWithCollabs = projectsColumns(groupedCollabs)
</script>

<template>
  <div>
    <DataTable v-if="projects" :columns="columnsWithCollabs" :data="projects" />
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
