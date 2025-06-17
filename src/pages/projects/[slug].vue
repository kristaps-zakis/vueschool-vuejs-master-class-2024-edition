<script setup lang="ts">
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import Table from '@/components/ui/table/Table.vue'
import TableBody from '@/components/ui/table/TableBody.vue'
import TableCell from '@/components/ui/table/TableCell.vue'
import TableHead from '@/components/ui/table/TableHead.vue'
import TableHeader from '@/components/ui/table/TableHeader.vue'
import TableRow from '@/components/ui/table/TableRow.vue'
import { RouterLink } from 'vue-router'
import { useProjectStore } from '@/stores/loaders/projects'
import AppInPlaceEditText from '@/components/AppInPlaceEdit/AppInPlaceEditText.vue'
import AppInPlaceEditStatus from '@/components/AppInPlaceEdit/AppInPlaceEditStatus.vue'
import { useCollabs } from '@/composables/collabs'

const { slug } = useRoute('/projects/[slug]').params

const projectLoader = useProjectStore()
const { project } = storeToRefs(projectLoader)
const { getProject, updateProject } = projectLoader

watch(
  () => project.value?.name,

  () => {
    usePageStore().pageData.title = `Project: ${project.value?.name || 'Unknown'}`
  },
)

await getProject(slug)

const { getProfilesByIds } = useCollabs()
const collabs = await getProfilesByIds(project.value?.collaborators || [])
</script>

<template>
  <Table v-if="project">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell><AppInPlaceEditText v-model="project.name" @commit="updateProject" /> </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        <AppInPlaceEditText v-model="project.description" @commit="updateProject" />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell
        ><AppInPlaceEditStatus v-model="project.status" @commit="updateProject"
      /></TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="collaborator in collabs"
            :key="collaborator.id"
          >
            <RouterLink
              class="w-full h-full flex items-center justify-center"
              :to="{ name: '/users/[username]', params: { username: collaborator.username } }"
            >
              <AvatarImage :src="collaborator.avatar_url || ''" alt="" />
              <AvatarFallback> </AvatarFallback>
            </RouterLink>
          </Avatar>
        </div>
      </TableCell>
    </TableRow>
  </Table>

  <section v-if="project" class="mt-10 flex flex-col md:flex-row gap-5 justify-between grow">
    <div class="flex-1">
      <h2>Tasks</h2>
      <div class="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Status </TableHead>
              <TableHead> Due Date </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="task in project.tasks" :key="task.id">
              <TableCell class="p-0">
                <RouterLink
                  class="text-left block hover:bg-muted p-4"
                  :to="{ name: '/tasks/[id]', params: { id: task.id } }"
                >
                  {{ task.name }}
                </RouterLink>
              </TableCell>
              <TableCell> <AppInPlaceEditStatus :modelValue="task.status" readonly /> </TableCell>
              <TableCell> {{ task.due_date }} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    <div class="flex-1">
      <h2>Documents</h2>
      <div class="table-container">
        <p class="text-muted-foreground text-sm font-semibold px-4 py-3">
          This project doesn't have documents yet...
        </p>
        <!-- <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Visibility </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> Private </TableCell>
            </TableRow>
          </TableBody>
        </Table> -->
      </div>
    </div>
  </section>
</template>

<style>
@reference "@/assets/globals.css";
:deep(th) {
  @apply w-[100px];
}

:deep(h2) {
  @apply mb-4 text-lg font-semibold w-fit;
}

.table-container {
  @apply overflow-hidden overflow-y-auto rounded-md bg-slate-900 h-80;
}
</style>
